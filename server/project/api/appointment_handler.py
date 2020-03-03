from flask import Blueprint, request
from flask_restx import Resource, fields, marshal, reqparse
from project import db, api
from project.models.appointment import Appointment, add_appointment
from project.models.participant import Participant, create_participant
from project.models.availability import Availability
from project.models.event import Event
from project.models.user import User
from project.decorators import token_required
from project.error_handlers import *
import datetime as dt
from dateutil import parser
import calendar
import pytz
from sqlalchemy import inspect
# from calendar import NEXT_X_DAYS  # TODO fix import and remove placeholder

NEXT_X_DAYS = 90  # TODO remove placeholder after calendar PR is implemented

appointment_blueprint = Blueprint('appointments', __name__)

#-------------------------------------------------------------------------------
# Helper Functions
#-------------------------------------------------------------------------------


def participant_exists(name: str, email: str) -> Participant:
    """
    Checks whether the Participant already exists and returns it otherwise
    creates a new participant returns that participant.
    :param name: Name of the participant
    :param email: Email of the participant
    :return: a Participant
    """
    participant = Participant.query.filter_by(email=email).first()
    if not participant:
        participant = create_participant(name=name, email=email)
    return participant


def start_within_next_x_days(start: str, next_x_days=NEXT_X_DAYS) -> bool:
    """
    Checks whether the appointment is scheduled within the NEXT_X_DAYS returns
    a boolean.
    :param start: when the appointment is scheduled in ISO 8601
    :param next_x_days: NEXT_X_DAYS the amount of days that the calendar is
    generated for
    :return: Whether the appointment is within the NEXT_X_DAYS
    """
    return parser.isoparse(start) <= \
        dt.datetime.now(dt.timezone.utc) + dt.timedelta(days=next_x_days)


def appointment_availability_allowed(availability: Availability, duration: int,
                                     start: dt.datetime) -> bool:
    """
    Checks and returns whether the appointment is available.
    :param availability: the availability for the event
    :param duration: the duration of the event
    :param start: the time to schedule the appointment
    :return: whether the time is allowed
    """
    weekday = calendar.day_name[start.weekday()].lower()
    if not availability.__getattribute__(weekday):
        allowed = False
    elif start.time() < availability.start or \
            (start + dt.timedelta(minutes=duration)).time() > availability.end:
        allowed = False
    else:
        allowed = True
    return allowed


def edit_appointment(params, appointment: Appointment) -> Appointment:
    """
    Edits the appointment with the provided data and returns the edited
    appointment.
    :param params: the data used to edit the appointment
    :param appointment: the appointment to be edited
    :return: the edited appointment
    """
    appointment_fields = inspect(Appointment).columns.keys()
    for key, value in params.items():
        if key in appointment_fields:
            setattr(appointment, key, value)
    return appointment


#-------------------------------------------------------------------------------
# Serializers
#-------------------------------------------------------------------------------

participant_input = api.model(
    'Participants', {
        'name':
        fields.String(description='The name of the participant',
                      required=True,
                      example='John Doe',
                      min_length=1,
                      max_length=128),
        'email':
        fields.String(description='The email of the participant',
                      required=True,
                      example='johndoe@email.com',
                      min_length=5,
                      max_length=128)
    })
appointment_input = api.model(
    'Appointment', {
        'start':
        fields.DateTime(description='The start time of the '
                        'appointment.',
                        required=True,
                        example='2020-01-20T08:30:00Z'),
        'comments':
        fields.String(description='Any comments to send to the '
                      'event creator',
                      example='Look forward to seeing you!',
                      max_length=1024),
        'participant':
        fields.Nested(participant_input, required=True)
    })
participant_output = api.model(
    'Participants', {
        'name':
        fields.String(description='The name of the participant',
                      required=True,
                      example='John Doe',
                      min_length=1,
                      max_length=128),
        'email':
        fields.String(description='The email of the participant',
                      required=True,
                      example='johndoe@email.com',
                      min_length=5,
                      max_length=128)
    })
appointment_patch = api.model(
    'Appointment', {
        'start':
        fields.DateTime(description='The start time of the '
                        'appointment.',
                        example='2020-01-20T08:30:00Z'),
        'status':
        fields.Boolean(description='Whether the appointment is still '
                       'active.')
    })
appointments_output = api.model(
    'Appointment', {
        'start':
        fields.DateTime(description='The start time of the '
                        'appointment',
                        required=True,
                        example='2020-01-20T08:30:00Z'),
        'end':
        fields.DateTime(description='The end time of the appointment',
                        required=True,
                        example='2020-01-20T09:30:00Z'),
        'created':
        fields.DateTime(description='When the appointment was '
                        'created',
                        required=True,
                        example='2020-01-25T09:30:00Z'),
        'status':
        fields.Boolean(description='Whether the appointment is still '
                       'active'),
        'comments':
        fields.String(description='Any comments to send to the '
                      'event creator',
                      example='Look forward to seeing you!',
                      max_length=1024),
        'participants':
        fields.List(fields.Nested(participant_output, required=True))
    })
appointment_output = api.model(
    'Appointment', {
        'start':
        fields.DateTime(description='The start time of the '
                        'appointment',
                        required=True,
                        example='2020-01-20T08:30:00Z'),
        'end':
        fields.DateTime(description='The end time of the appointment',
                        required=True,
                        example='2020-01-20T09:30:00Z'),
        'created':
        fields.DateTime(description='When the appointment was '
                        'created',
                        required=True,
                        example='2020-01-25T09:30:00Z'),
        'status':
        fields.Boolean(description='Whether the appointment is still '
                       'active'),
        'comments':
        fields.String(description='Any comments to send to the '
                      'event creator',
                      example='Look forward to seeing you!',
                      max_length=1024),
        'participants':
        fields.Nested(participant_output, required=True)
    })

#-------------------------------------------------------------------------------
# Parser
#-------------------------------------------------------------------------------

appointment_args = reqparse.RequestParser()
appointment_args.add_argument('event_url',
                              type=str,
                              help='Specific event url of the event.',
                              location='args')

#-------------------------------------------------------------------------------
# Routes
#-------------------------------------------------------------------------------


@api.route('/users/<public_id>/appointments')
class UserAppointments(Resource):
    @token_required
    @api.expect(appointment_args)
    @api.marshal_with(appointments_output, as_list=True)
    def get(self, public_id, current_user=None):
        if current_user.public_id != public_id:
            raise PermissionError

        args = appointment_args.parse_args()

        url = args.get('event_url')
        if url:
            appointments = db.session.query(Appointment).filter(
                Appointment.event_id == Event.id,
                Event.url == url,
            ).all()
        else:
            appointments = db.session.query(Appointment).filter(
                Appointment.event_id == Event.id,
                Event.user_id == current_user.id).all()
        return appointments, 200


@api.route('/users/<public_id>/events/<event_url>/appointments')
class Appointments(Resource):
    @token_required
    @api.marshal_with(appointments_output, as_list=True)
    def get(self, public_id, event_url, current_user=None):
        """Returns all of the appointments for the event."""
        if current_user.public_id != public_id:
            raise PermissionError

        appointments = db.session.query(Appointment). \
            filter(Event.url == event_url).all()

        return appointments, 200

    @api.expect(appointment_input, validate=True)
    def post(self, public_id, event_url):
        """Creates an appointment for the specified event."""
        payload = api.payload

        if not start_within_next_x_days(payload['start']):
            raise AppointmentAfterNext_X_DaysError(NEXT_X_DAYS)

        event = db.session.query(Event). \
            filter(Event.url == event_url, User.public_id == public_id). \
            first()

        if not appointment_availability_allowed(
                event.availability, event.duration,
                parser.isoparse(payload['start'])):
            raise AppointmentNotAvailableError

        participant = participant_exists(payload['participant']['name'],
                                         payload['participant']['email'])
        add_appointment(event_id=event.id,
                        participants=[participant],
                        start=parser.isoparse(payload['start']),
                        end=parser.isoparse(payload['start']) +
                        dt.timedelta(minutes=event.duration),
                        comments=payload['comments'])
        db.session.commit()
        return {'message': 'success'}, 201


@api.route('/users/<public_id>/events/<event_url>/appointments/<iso_start>')
class AppointmentDetail(Resource):
    @api.marshal_with(appointment_output, skip_none=True)
    def get(self, public_id, event_url, iso_start):
        """Returns the details for a specific appointment."""
        appointment = db.session.query(Appointment).\
            filter(User.public_id == public_id,
                   Event.url == event_url,
                   Appointment.start ==
                   parser.isoparse(iso_start)).\
            first()

        if appointment is None:
            raise AppointmentNotFoundError
        else:
            response = appointment
            code = 200

        return response, code

    @api.expect(appointment_patch, validate=True)
    def patch(self, public_id, event_url, iso_start):
        """Modifies the specific appointment."""
        appointment = db.session.query(Appointment).\
            filter(User.public_id == public_id,
                   Event.url == event_url,
                   Appointment.start ==
                   parser.isoparse(iso_start)).\
            first()

        if appointment is None:
            raise AppointmentNotFoundError
        elif appointment.end <= dt.datetime.now(dt.timezone.utc):
            raise AppointmentEndedError
        elif appointment.start <= dt.datetime.now(dt.timezone.utc):
            raise EditDuringAppointmentError
        else:
            data = marshal(api.payload, appointment_patch, skip_none=True)
            edit_appointment(data, appointment)
            db.session.commit()

        return {'message': 'success'}, 200
