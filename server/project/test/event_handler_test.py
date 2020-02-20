import json
import datetime as dt
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


class EventCreateTest(TestBase):
    def test_add_event(self):
        """Tests whether an event can be successfully created."""
        user = add_user()
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        url = 'clickme'

        response = self.api.post(f'/users/{user.public_id}/events',
                                 headers={'x-access-token': auth_token},
                                 data=create_event_json(url=url),
                                 content_type='application/json')

        data = json.loads(response.data.decode())
        event = Event.query.filter_by(url=url).first()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['message'], 'success')
        self.assertEqual(event.url, url)

    def test_blank_url(self):
        """Tests whether passing a blank url returns a 400 response."""
        user = add_user()
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        url = ''

        response = self.api.post(f'/users/{user.public_id}/events',
                                 headers={'x-access-token': auth_token},
                                 data=create_event_json(url=url),
                                 content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['message'],
                         'Input payload validation failed')
        self.assertEqual(data['errors']['url'], f"'' is too short")

    def test_blank_name(self):
        """Tests whether passing a blank name returns a 400 response."""
        user = add_user()
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        name = ''

        response = self.api.post(f'/users/{user.public_id}/events',
                                 headers={'x-access-token': auth_token},
                                 data=create_event_json(name=name),
                                 content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['message'],
                         'Input payload validation failed')
        self.assertEqual(data['errors']['name'], f"'' is too short")

    def test_missing_token(self):
        """Tests whether a request with a missing token returns a 401
        response."""
        user = add_user()
        db.session.commit()

        response = self.api.post(f'/users/{user.public_id}/events',
                                 data=create_event_json(),
                                 content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 401)
        self.assertEqual(data['message'], 'Token is missing!')

    def test_bad_token(self):
        """Tests whether a request with an invalid token returns a 403
        response."""
        user1 = add_user(email='test1@email.com')
        user2 = add_user(email='test2@email.com')
        db.session.commit()
        auth_token2 = user2.encode_auth_token(user2.id)

        response = self.api.post(f'/users/{user1.public_id}/events',
                                 headers={'x-access-token': auth_token2},
                                 data=create_event_json(),
                                 content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 403)
        self.assertEqual(data['message'],
                         "You do not have permission to access this content")

    def test_space_in_url(self):
        """Tests whether a request with a space in the url returns a 400
        response."""
        user = add_user()
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        url = 'look a space'

        response = self.api.post(f'/users/{user.public_id}/events',
                                 headers={'x-access-token': auth_token},
                                 data=create_event_json(url=url),
                                 content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 400)


class EventsGetTest(TestBase):
    def test_event_marshal(self):
        user = add_user()
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        start = 6
        availability = create_availability(start=dt.time(start))
        url = 'funnyUrl'
        color = '#7851a9'
        add_event(user.id, availability, url=url,
                  color=color.lstrip('#'))
        db.session.commit()

        response = self.api.get(f'/users/{user.public_id}/events',
                                headers={'x-access-token': auth_token},
                                content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(data[0]['url'], url)
        self.assertEqual(data[0]['availability']['start'], start)
        self.assertEqual(data[0]['color'], color)
