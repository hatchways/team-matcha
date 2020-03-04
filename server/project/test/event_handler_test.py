import json
import datetime as dt
from project import db
from project.test.test_base import TestBase
from project.models.availability import Availability, create_availability
from project.models.event import Event, add_event
from project.models.creds import add_cred
from project.models.user import User, add_user, Role

#-------------------------------------------------------------------------------
# Helper Functions
#-------------------------------------------------------------------------------


def seed_event():
    result = {}
    user = add_user()
    cred = add_cred()
    user.cred = cred
    user_id = User.query.first().id
    availability = create_availability()
    name = '♪┏(・o･)┛♪┗ ( ･o･) ┓♪'
    url = 'myCoolParty'
    location = 'da street!'
    event = add_event(url=url,
                      name=name,
                      location=location,
                      user_id=user_id,
                      availability=availability)
    result['user'] = user
    result['event'] = event
    return result


def create_event_json(name='My event',
                      location='',
                      description='',
                      duration=60,
                      url='myevent',
                      color='#000000',
                      start=dt.time(hour=8, tzinfo=dt.timezone.utc).isoformat(),
                      end=dt.time(hour=17, tzinfo=dt.timezone.utc).isoformat(),
                      sunday=False,
                      monday=True,
                      tuesday=True,
                      wednesday=True,
                      thursday=True,
                      friday=True,
                      saturday=False,):
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


#-------------------------------------------------------------------------------
# Tests
#-------------------------------------------------------------------------------


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
        self.assertEqual(data['message'], 'Input payload validation failed')
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
        self.assertEqual(data['message'], 'Input payload validation failed')
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

    def test_no_days_available(self):
        """Tests whether a POST request with no days selected as available
        returns a 400 response."""
        user = add_user()
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        event_json = create_event_json(sunday=False, monday=False,
                                       tuesday=False, wednesday=False,
                                       thursday=False, friday=False,
                                       saturday=False)

        response = self.api.post(f'/users/{user.public_id}/events',
                                 headers={'x-access-token': auth_token},
                                 data=event_json,
                                 content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['status'], 'fail')
        self.assertEqual(data['message'], 'At least one day must be selected as'
                                          ' available. Please select at least '
                                          'one day and resubmit your request.')

    def test_starttime_after_endtime(self):
        """Tests whether a POST request with a start time after the end time
        is rejected with a 400 response."""
        user = add_user()
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)

        response = self.api.post(
            f'/users/{user.public_id}/events',
            headers={'x-access-token': auth_token},
            data=create_event_json(
                start=dt.time(hour=17, tzinfo=dt.timezone.utc).isoformat(),
                end=dt.time(hour=8, tzinfo=dt.timezone.utc).isoformat(),),
            content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['status'], 'fail')
        self.assertEqual(data['message'], 'The start time must be before the '
                                          'end time. Please resubmit your '
                                          'request with a valid start and end '
                                          'time.')

    def test_add_event_promotes_member(self):
        """Tests whether an onboarding user is promoted to Member after
        successful post event
        """
        user = add_user()
        db.session.commit()
        user_id = user.id
        auth_token = user.encode_auth_token(user.id)
        url = 'clickme'

        response = self.api.post(f'/users/{user.public_id}/events',
                                 headers={'x-access-token': auth_token},
                                 data=create_event_json(url=url),
                                 content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['message'], 'success')

        user = User.query.get(user_id)
        self.assertEqual(user.role, Role.MEMBER)



class EventsGetTest(TestBase):
    def test_event_marshal(self):
        user = add_user()
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        start = dt.time(hour=6, tzinfo=dt.timezone.utc)
        sunday = True
        availability = create_availability(start=start,
                                           sunday=sunday)
        url = 'funnyUrl'
        color = '#7851a9'
        add_event(user.id, availability, url=url, color=color.lstrip('#'))
        db.session.commit()
        response = self.api.get(f'/users/{user.public_id}/events',
                                headers={'x-access-token': auth_token},
                                content_type='application/json')
        data = json.loads(response.data.decode())
        self.assertEqual(data[0]['url'], url)
        self.assertEqual(data[0]['availability']['start'], start.isoformat())
        self.assertEqual(data[0]['color'], color)
        self.assertEqual(data[0]['availability']['days']['sunday'], sunday)


class EventDetailPut(TestBase):
    def test_update_event(self):
        result = seed_event()
        user = result['user']
        event = result['event']
        db.session.commit()
        old_event_id = event.id
        old_location = event.location
        auth_token = user.encode_auth_token(user.id)

        response = self.api.put(f'/users/{user.public_id}/events/{event.url}',
                                headers={'x-access-token': auth_token},
                                data=json.dumps({
                                    'location': 'New location',
                                    'badparams': 'blahfdfsdf'
                                }),
                                content_type='application/json')

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], "Success")

        updated_event = Event.query.get(old_event_id)
        self.assertNotEqual(updated_event.location, old_location)

        self.assertEqual(updated_event.location, "New location")

    def test_update_availability(self):
        """Tests whether a PUT request can be made to update Availability
        parameters."""
        result = seed_event()
        user = result['user']
        event = result['event']
        url = event.url
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        start = dt.time(hour=12, tzinfo=dt.timezone.utc)
        sunday = True

        response = self.api.put(f'/users/{user.public_id}/events/{url}',
                                headers={'x-access-token': auth_token},
                                data=json.dumps({
                                    'availability': {
                                        'start': start.isoformat(),
                                        'days': {'sunday': sunday}}
                                }),
                                content_type='application/json')

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Success')

        updated_event = Event.query.filter_by(url=url).first()

        self.assertEqual(updated_event.availability.start, start)
        self.assertEqual(updated_event.availability.sunday, sunday)

    def test_no_days_available(self):
        """Tests whether attempting to set all days as unavailable returns
        a 400 error."""
        result = seed_event()
        user = result['user']
        event = result['event']
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        days = {'sunday': False, 'monday': False, 'tuesday': False,
                'wednesday': False, 'thursday': False, 'friday': False,
                'saturday': False}

        response = self.api.put(f'/users/{user.public_id}/events/{event.url}',
                                headers={'x-access-token': auth_token},
                                data=json.dumps({
                                    'availability': {
                                        'days': days}
                                }),
                                content_type='application/json')

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['status'], 'fail')
        self.assertEqual(data['message'], 'At least one day must be selected as'
                                          ' available. Please select at least '
                                          'one day and resubmit your request.')

    def test_default_override(self):
        """Tests whether default setting in the marshal are overriding set
        values."""
        user = add_user()
        db.session.commit()
        url = 'iwontfail'
        duration = 15
        event = add_event(user.id, create_availability(), duration=duration,
                          url=url)
        auth_token = user.encode_auth_token(user.id)
        db.session.commit()

        response = self.api.put(f'/users/{user.public_id}/events/{event.url}',
                                headers={'x-access-token': auth_token},
                                data=json.dumps({'name': "please don't fail"}),
                                content_type='application/json')

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Success')

        event = Event.query.filter_by(url=url).first()
        self.assertEqual(event.duration, duration)


class EventDetailGet(TestBase):
    def test_get_event(self):
        result = seed_event()
        user = result['user']
        event = result['event']
        db.session.commit()

        response = self.api.get(f'/users/{user.public_id}/events/{event.url}')

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)

        self.assertEqual(data['url'], event.url)

    def test_event_marshal(self):
        user = add_user()
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        start = dt.time(hour=6, tzinfo=dt.timezone.utc)
        sunday = True
        availability = create_availability(start=start,
                                           sunday=sunday)
        url = 'funnyUrl'
        color = '#7851a9'
        add_event(user.id, availability, url=url, color=color.lstrip('#'))
        db.session.commit()
        response = self.api.get(f'/users/{user.public_id}/events/{url}',
                                headers={'x-access-token': auth_token},
                                content_type='application/json')
        data = json.loads(response.data.decode())
        self.assertEqual(data['url'], url)
        self.assertEqual(data['availability']['start'], start.isoformat())
        self.assertEqual(data['color'], color)
        self.assertEqual(data['availability']['days']['sunday'], sunday)


class EventDetailDelete(TestBase):
    def test_delete_event_success(self):
        result = seed_event()
        user = result['user']
        event = result['event']
        db.session.commit()
        availability_id = event.availability_id
        auth_token = user.encode_auth_token(user.id)

        # Before Delete
        self.assertTrue(Event.query.get(event.id))
        self.assertTrue(Event.query.get(event.availability_id))

        response = self.api.delete(f'/users/{user.public_id}/events/{event.url}',
                                headers={'x-access-token': auth_token})

        data = json.loads(response.data.decode())

        # After Delete
        self.assertEqual(response.status_code, 200)

        # event is deleted
        self.assertIsNone(Event.query.get(event.id))

        # availability also deleted
        self.assertIsNone(Event.query.get(event.availability_id))
