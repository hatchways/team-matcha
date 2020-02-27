from flask import Blueprint
from flask_restx import Resource, fields, marshal
from project import db, api
from project.models.appointment import Appointment, add_appointment
from project.models.participant import Participant, create_participant
from project.models.event import Event
from project.decorators import token_required
from project.error_handlers import *
import datetime as dt

appointment_blueprint = Blueprint('appointments', __name__)

participant_input_output = api.model(
    'Participants', {
        'name': fields.String(description='The name of the participant',
                              required=True, example='John Doe', min_length=1,
                              max_length=128),
        'email': fields.String(description='The email of the participant',
                               required=True, example='johndoe@email.com',
                               min_length=5, max_length=128)})

appointment_input = api.model(
    'Appointment', {
        'comments': fields.String(description='Any comments to send to the '
                                              'event creator',
                                  example='Look forward to seeing you!',
                                  max_length=1024),
        'participant': fields.Nested(participant_input_output, required=True)})

appointment_output = api.model(
    'Appointment', {
        'start': fields.DateTime(description='The start time of the '
                                             'appointment',
                                 required=True, example='2020-01-20T08:30:00'),
        'end': fields.DateTime(description='The end time of the appointment',
                               required=True, example='2020-01-20T09:30:00'),
        'created': fields.DateTime(description='When the appointment was '
                                               'created',
                                   required=True, example='2020-01-25T09:30:00'),
        'status': fields.Boolean(description='Whether the appointment is still '
                                             'active'),
        'comments': fields.String(description='Any comments to send to the '
                                              'event creator',
                                  example='Look forward to seeing you!',
                                  max_length=1024),
        'participants': fields.List(fields.Nested(participant_input_output,
                                                  required=True))})


@api.route('/users/<public_id>/events/<event_url>/appointments')
class Appointments(Resource):
    @token_required
    @api.marshal_with(appointment_output)
    def get(self, public_id, event_url, current_user=None):
        """Returns all of the appointments for the event."""
        if current_user.public_id != public_id:
            raise PermissionError

        appointments = db.session.query(Appointment).\
            filter(Event.url == event_url).all()

        return appointments, 200
