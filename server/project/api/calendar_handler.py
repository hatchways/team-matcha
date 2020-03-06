from flask import Blueprint
from flask_restx import Resource, reqparse
from project import db
from project.api import api
from project.calendars import Calendars
from project.models.appointment import Appointment
from project.models.event import Event
from project.models.user import User
from project.services.google_calendar import fetch_free_busy
import datetime as dt
import pytz

calendar_blueprint = Blueprint('calendar', __name__)

NEXT_X_DAYS = 90


def str_to_date(date):
    return (dt.strptime(date, '%Y-%m-%dT%H:%M:%SZ'))


def query_appointments(user):
    """
    :param user
    :return a list of time slot objects with start and end times
    """
    appointments = db.session.query(Appointment).filter(
        Appointment.event_id == Event.id, Event.user_id == user.id,
        Appointment.start > dt.datetime.now(dt.timezone.utc))
    result = map(
        lambda x: {
            "start": x.start.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "end": x.end.strftime("%Y-%m-%dT%H:%M:%SZ")
        }, appointments)
    return list(result)


#-------------------------------------------------------------------------------
# Parser
#-------------------------------------------------------------------------------

calendar_args = reqparse.RequestParser()
calendar_args.add_argument('timezone',
                           type=str,
                           help='Local timezone of the client',
                           location='args',
                           required=True)


@api.route('/users/<public_id>/events/<event_url>/calendar')
class Calendar(Resource):
    def get(self, public_id, event_url):

        response = {}
        event = Event.query.filter_by(url=event_url).first()
        user = User.query.filter_by(public_id=public_id).first()
        args = calendar_args.parse_args()

        timezone = args.get('timezone')

        if event and user:
            access_token = user.cred.access_token
            busy = fetch_free_busy(access_token, user)
            appointments = query_appointments(user)
            avail = event.availability
            c = Calendars(duration=event.duration,
                          next_x_days=NEXT_X_DAYS,
                          timezone=timezone)
            c.block_unavail_days(avail)
            c.block_events(busy)
            c.block_events(appointments)
            response, code = c.all_avail_time_slots(), 200
        else:
            response['error'], code = "Event not found", 404

        return response, code
