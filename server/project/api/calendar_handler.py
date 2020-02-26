from project.models.availability import Availability
from project.models.event import Event
from project import db, api
from datetime import datetime as dt, timezone, timedelta
from project.calendars import Calendars
from flask import Blueprint
from flask_restx import Resource, fields, marshal, reqparse
import json

calendar_blueprint = Blueprint('calendar', __name__)

mock_response = {
    "kind": "calendar#freeBusy",
    "timeMin": "2020-02-21T23:34:33.000Z",  # => now
    "timeMax": "2020-03-22T23:34:33.000Z",  # => Needs to be 3 months from now
    "calendars": {
        "kcheung331@gmail.com": {
            "busy": [#=> Busy 12am-9am and 5pm-12am
                {
                    "start": "2020-02-25T10:30:00Z",
                    "end": "2020-02-25T12:00:00Z"
                },

                {
                    "start": "2020-02-26T10:00:00Z",
                    "end": "2020-02-26T12:00:00Z"
                },
                {
                    "start": "2020-02-27T10:00:00Z",
                    "end": "2020-02-27T12:00:00Z"
                },
                {
                    "start": "2020-02-28T10:00:00Z",
                    "end": "2020-02-21T12:00:00Z"
                },
                {
                    "start": "2020-02-28T10:00:00Z",
                    "end": "2020-02-21T12:00:00Z"
                },
                {
                    "start": "2020-02-29T10:00:00Z",
                    "end": "2020-02-29T12:00:00Z"
                },

            ]
        }
    }
}


@api.route('/users/<public_id>/events/<event_url>/calendar')
class Calendar(Resource):
    def get(self, public_id, event_url):
        response = {}
        event = Event.query.filter_by(url=event_url).first()
        if event:
            avail = event.availability
            busy = mock_response['calendars']['kcheung331@gmail.com']['busy']
            c = Calendars(duration=event.duration)
            c.block_unavail_days(avail)
            c.block_events(busy)
            response, code = c.all_avail_time_slots(), 200
        else:
            response['error'], code = "Event not found", 404

        return response, code
