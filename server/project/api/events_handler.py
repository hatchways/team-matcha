from flask import Blueprint, abort
from flask_restx import Resource, fields
from project import db, api
from project.api.models import Availability, Event, User

events_blueprint = Blueprint('events', __name__)

weekday = fields.Boolean(
    default=True, example=True,
    description='Whether an event should be scheduled on this day.')
weekend = fields.Boolean(
    default=False, example=False,
    description='Whether an event should be scheduled on this day.')
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
        'days': fields.Nested(days_input),
        'start': fields.Integer(
            description='Your earliest availability for the event',
            required=True, example=8),
        'end': fields.Integer(
            description='Your latest availability for the event.',
            required=True, example=17)})
event_input = api.model(
    'Event', {
        'name': fields.String(
            description='The name of the event.', required=True,
            example='Party!', max_length=32),
        'location': fields.String(
            description='The location where the event will take place',
            example='101 Example St.', max_length=256),
        'description': fields.String(
            description='A description for the event.',
            example='This is an awesome description.', max_length=1024),
        'url': fields.String(
            description='The unique url for this event.', required=True,
            example='myevent', max_length=32),
        'colour': fields.String(
            description='A hex representation of a colour without the #.',
            required=True, example='FFC0CB', max_length=6),
        'availability': fields.Nested(availability_input)})


def add_event(params, user):
    pass
    if params['name']:
        name = params['name']
    name = params['name']
    user_id = User.query.filter_by(public_id=user).first().id
    availability = Availability()  # TODO
    event = Event(name, location, description, url, colour, user_id,
                  availability_id)
    db.session.add(availability)
    db.session.add(event)
    db.session.commit()
    return event


@api.route('/users/<user>/events')
class Event(Resource):
    def get(self, user):
        return {'message': 'success'}, 200

    @api.expect(event_input, validate=True)
    def post(self, user):
        event = add_event(api.payload, user)
        return {'message': 'success'}, 201
