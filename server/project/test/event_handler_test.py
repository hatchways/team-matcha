import json
from project import db
from project.api.models import Availability, Event, User
from project.test.test_base import TestBase
from project.test.availability_test import add_availability
from project.test.event_test import add_event
from project.test.user_test import add_user


class EventCreateTest(TestBase):
    def test_add_event(self):
        user = add_user()
        availability = {'days': {'sunday': False, 'monday': True,
                                 'tuesday': True, 'wednesday': True,
                                 'thursday': True, 'friday': True,
                                 'saturday': False},
                        'start': 8, 'end': 17}
        event = {'name': 'My first event', 'location': 'My home',
                 'description': 'A completely legit event.',
                 'url': 'myfirstevent', 'colour': '0000ff',
                 'availability': availability}
        data = json.dumps(event)
        response = self.api.post(f'/users/{user.public_id}/events', data=data,
                                 content_type='application/json')

        self.assertEqual(response.status_code, 201)
