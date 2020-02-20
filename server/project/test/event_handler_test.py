import json
from project import db
from project.test.test_base import TestBase
from project.models.availability import Availability, create_availability
from project.models.event import Event, add_event
from project.models.user import User, add_user


def create_event_json(name='My event', location='', description='', duration=60,
                      url='myevent', color='#000000', start=8, end=17,
                      sunday=False, monday=True, tuesday=True, wednesday=True,
                      thursday=True, friday=True, saturday=False):
    """
    Creates JSON dump to create an Event.
    :param name: name of the event
    :param location: location of the event
    :param description: description of the event
    :param duration: duration of the event in minutes
    :param url: url suffix of the event
    :param color: color of the event including the preceeding '#'
    :param start: start of the event in hours
    :param end: end of the event in hours
    :param sunday: whether the event can scheduled on sunday
    :param monday: whether the event can scheduled on monday
    :param tuesday: whether the event can scheduled on tuesday
    :param wednesday: whether the event can scheduled on wednesday
    :param thursday: whether the event can scheduled on thursday
    :param friday: whether the event can scheduled on friday
    :param saturday: whether the event can scheduled on saturday
    :return: JSON dump
    """
    data = {
        'name': name,
        'location': location,
        'description': description,
        'duration': duration,
        'url': url,
        'color': color,
        'availability': {
            'start': start,
            'end': end,
            'days': {
                'sunday': sunday,
                'monday': monday,
                'tuesday': tuesday,
                'wednesday': wednesday,
                'thursday': thursday,
                'friday': friday,
                'saturday': saturday
            }
        }
    }
    return json.dumps(data)


def create_user_id() -> int:
    """
    Commits a User and returns the User's public_id.
    :return: The public_id of a created user
    """
    add_user()
    db.session.commit()
    public_id = User.query.first().public_id
    return public_id


class EventCreateTest(TestBase):
    def test_add_event(self):
        """Tests whether an event can be successfully created."""
        public_id = create_user_id()
        url = 'clickme'
        data = create_event_json(url=url)
        response = self.api.post(f'/users/{public_id}/events', data=data,
                                 content_type='application/json')
        event = Event.query.filter_by(url=url).first()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(event.url, url)
