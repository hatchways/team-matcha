from flask import Blueprint
from flask_restx import Resource
from project.api import api
from project.calendars import Calendars
from project.models.event import Event
from project.models.user import User
from project.services.google_calendar import fetch_free_busy

calendar_blueprint = Blueprint('calendar', __name__)

NEXT_X_DAYS = 90

@api.route('/users/<public_id>/events/<event_url>/calendar')
class Calendar(Resource):
    def get(self, public_id, event_url):

        response = {}
        event = Event.query.filter_by(url=event_url).first()
        user = User.query.filter_by(public_id=public_id).first()

        if event and user:
            access_token = user.cred.access_token
            busy = fetch_free_busy(access_token, user.email)
            avail = event.availability
            c = Calendars(duration=event.duration, next_x_days=NEXT_X_DAYS)
            c.block_unavail_days(avail)
            c.block_events(busy)
            response, code = c.all_avail_time_slots(), 200
        else:
            response['error'], code = "Event not found", 404

        return response, code
