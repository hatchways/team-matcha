import json
from project import db
from project.models.event import Event, add_event
from project.models.user import User, add_user
from project.test.test_base import TestBase
from project.models.availability import Availability, create_availability
from project.test.event_handler_test import seed_event


class CalendarTestCase(TestBase):
    def test_getting_calendar(self):
        result = seed_event()
        user = result['user']
        event = result['event']
        db.session.commit()

        response = self.api.get(f'/users/{user.public_id}/events/{event.url}/calendar')

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)
