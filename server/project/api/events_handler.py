from flask import Blueprint, abort
from flask_restx import Resource, fields, marshal
from project import db, api
from project.models.availability import Availability, create_availability
from project.models.user import User, add_user
from project.models.event import Event, add_event, update_event
from typing import Tuple
from project.decorators import token_required
from project.error_handlers import *
import datetime as dt

events_blueprint = Blueprint('events', __name__)

weekday = fields.Boolean(
    default=True,
    description='Whether an event should be scheduled on this day')
weekend = fields.Boolean(
    default=False,
    description='Whether an event should be scheduled on this day')
days_input = api.model(
    'Days', {
        'sunday': weekend,
        'monday': weekday,
        'tuesday': weekday,
        'wednesday': weekday,
        'thursday': weekday,
        'friday': weekday,
        'saturday': weekend
    })
availability_input = api.model(
    'Availability', {
        'start': fields.Integer(
            description='Your earliest availability for the event',
            default=8),
        'end': fields.Integer(
            description='Your latest availability for the event',
            default=17),
        'days': fields.Nested(days_input)})
event_input_output = api.model(
    'Event', {
        'name': fields.String(
            description='The name of the event', required=True,
            example='My event', min_length=1, max_length=32),
        'location': fields.String(
            default=None,
            description='The location where the event will take place',
            example='My office', max_length=256),
        'description': fields.String(
            default=None, description='A description for the event',
            example='This is an awesome description.', max_length=1024),
        'duration': fields.Integer(
            description='The duration of the event in minutes', default=60),
        'url': fields.String(
            description='The unique url for this event', required=True,
            example='myevent', min_length=1, max_length=32),
        'color': fields.String(
            description="A hex representation of a colour with the leading '#'",
            required=True, example='#000000', min_length=7, max_length=7),
        'availability': fields.Nested(availability_input)})


@api.route('/users/<public_id>/events')
class Events(Resource):
    @token_required
    @api.marshal_with(event_input_output)
    def get(self, public_id, current_user=None):
        """Returns all the events that the user has created."""
        if current_user.public_id != public_id:
            raise PermissionError

        events = Event.query.\
            filter(Event.user_id == current_user.id).\
            all()

        for event in events:
            event.availability.start = event.availability.start.hour
            event.availability.end = event.availability.end.hour
            event.color = '#' + event.color

        return events, 200

    @token_required
    @api.expect(event_input_output, validate=True)
    def post(self, public_id, current_user=None):
        """Creates an Event for the specified user."""
        if current_user.public_id != public_id:
            raise PermissionError

        payload = api.payload

        if ' ' in payload['url']:
            raise UrlContainsSpace

        user_id = current_user.id
        availability = create_availability(
            sunday=payload['availability']['days']['sunday'],
            monday=payload['availability']['days']['monday'],
            tuesday=payload['availability']['days']['tuesday'],
            wednesday=payload['availability']['days']['wednesday'],
            thursday=payload['availability']['days']['thursday'],
            friday=payload['availability']['days']['friday'],
            saturday=payload['availability']['days']['saturday'],
            start=dt.time(payload['availability']['start']),
            end=dt.time(payload['availability']['end']))
        add_event(
            user_id=user_id,
            availability=availability,
            name=payload['name'],
            location=payload['location'],
            description=payload['description'],
            duration=payload['duration'],
            url=payload['url'],
            color=payload['color'].lstrip('#'))
        db.session.commit()
        return {'message': 'success'}, 201


@api.route('/users/<public_id>/events/<event_id>')
class EventDetail(Resource):

    @token_required
    def put(self, public_id, event_id, current_user=None):

        if current_user.public_id != public_id:
            raise PermissionError

        event = Event.query.get(event_id)
        data = marshal(api.payload, event_input_output, skip_none=True)
        if event is not None:
            user = event.user
            if user.public_id != current_user.public_id:
                raise PermissionError
            event = update_event(event, data)
            return {"message": "Success"}, 200
        return {"error": "Event not found"}, 404

    @token_required
    @api.marshal_with(event_input_output, skip_none=True)
    def get(self, public_id, event_id, current_user=None):

        if current_user.public_id != public_id:
            raise PermissionError

        event = Event.query.get(event_id)
        if event is not None:
            user = event.user
            if user.public_id != current_user.public_id:
                raise PermissionError

            event.availability.start = event.availability.start.hour
            event.availability.end = event.availability.end.hour
            event.color = '#' + event.color
            result = marshal(event ,event_input_output, skip_none=True)
            return result, 200
        return {"error": "Event not found"}, 404
