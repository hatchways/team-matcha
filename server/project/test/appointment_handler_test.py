import json
import datetime as dt
from project import db
from project.test.test_base import TestBase
from project.models.availability import Availability, create_availability
from project.models.event import Event, add_event
from project.models.user import User, add_user
from project.models.appointment import Appointment, add_appointment
from project.models.participant import Participant, create_participant
# from calendar import NEXT_X_DAYS  # TODO fix import and remove placeholder


NEXT_X_DAYS = 90  # TODO this should be the exact same value as in
# TODO appointment_handler.py


def create_appointment_json(start='2020-02-20T08:30:00',
                            comments='Look forward to seeing you!',
                            name='Little Timmy',
                            email='timmy@mail.com') -> str:
    """
    Creates and returns a JSON dump to POST an Appointment.
    :param start: start time of the event in ISO 8601
    :param comments: comments from the participant to the event creator
    :param name: the participant's name
    :param email: the participant's email
    :return: JSON dump
    """
    request = {'start': start,
               'comments': comments,
               'participant': {'name': name,
                               'email': email}}
    return json.dumps(request)


class AppointmentGetTest(TestBase):
    def test_get_appointments(self):
        """Tests whether appointments can be successfully requested."""
        add_user()
        db.session.commit()
        user = User.query.first()
        add_event(user_id=user.id, availability=create_availability())
        db.session.commit()
        event = Event.query.first()
        name = 'Jimmy Joe'
        comments = "OMG I haven't seen you in forever Jimmy how has it been?"
        add_appointment(event_id=event.id,
                        participants=[create_participant(name=name)],
                        comments=comments)
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)

        response = self.api.get(f'/users/{user.public_id}/events/{event.url}/'
                                f'appointments',
                                headers={'x-access-token': auth_token},
                                content_type='application/json')

        data = json.loads(response.data.decode())
        appointment = data[0]
        participants = appointment['participants'][0]

        self.assertEqual(response.status_code, 200)
        self.assertEqual(appointment['comments'], comments)
        self.assertEqual(participants['name'], name)

    def test_bad_token(self):
        """Tests whether a request with an invalid token returns a 403
        response."""
        add_user(email='test1@email.com')
        add_user(email='test2@email.com')
        db.session.commit()
        user1 = User.query.filter_by(email='test1@email.com').first()
        user2 = User.query.filter_by(email='test2@email.com').first()
        add_event(user1.id, create_availability())
        db.session.commit()
        event1 = Event.query.filter_by(user_id=user1.id).first()
        add_appointment(event_id=event1.id, participants=[create_participant()])
        db.session.commit()

        auth_token2 = user2.encode_auth_token(user2.id)
        route = f'/users/{user1.public_id}/events/{event1.url}/appointments'
        response = self.api.get(route,
                                headers={'x-access-token': auth_token2},
                                content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 403)
        self.assertEqual(data['message'],
                         "You do not have permission to access this content")

    def test_missing_token(self):
        """Tests whether a request with a missing token returns a 401
        response"""
        add_user(email='test1@email.com')
        db.session.commit()
        user = User.query.first()
        add_event(user.id, create_availability())
        db.session.commit()
        event = Event.query.first()
        add_appointment(event_id=event.id, participants=[create_participant()])
        db.session.commit()

        route = f'/users/{user.public_id}/events/{event.url}/appointments'
        response = self.api.get(route,
                                content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 401)
        self.assertEqual(data['message'], 'Token is missing!')


class AppointmentPostTest(TestBase):
    def test_post_appointments(self):
        """Tests whether an appointment can be successfully created and the
        appointment's attributes match what was supplied."""
        add_user()
        db.session.commit()
        user = User.query.first()
        user_public_id = user.public_id
        add_event(user.id, create_availability())
        db.session.commit()
        event = Event.query.first()
        event_url = event.url
        start = '2020-03-20T08:30:00'
        comments = "I don't know about this appointment man..."
        name = 'Little Timmy'
        email = 'little@timmy.com'

        route = f'/users/{user_public_id}/events/{event_url}/appointments'
        request = create_appointment_json(start=start,
                                          comments=comments,
                                          name=name,
                                          email=email)
        response = self.api.post(route,
                                 data=request,
                                 content_type='application/json')

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['message'], 'success')

        appointment = db.session.query(Appointment).\
            filter(User.public_id == user_public_id,
                   Event.url == event_url,
                   Appointment.start == start).\
            first()
        self.assertEqual(appointment.comments, comments)

        participant = appointment.participants[0]
        self.assertEqual(participant.name, name)
        self.assertEqual(participant.email, email)

    def test_start_after_next_x_days(self):
        """Tests whether a request made with a start time that is more than
        NEXT_X_DAYS is rejected with a 400 response."""
        add_user()
        db.session.commit()
        user = User.query.first()
        user_public_id = user.public_id
        add_event(user.id, create_availability())
        db.session.commit()
        event = Event.query.first()
        event_url = event.url

        start = (dt.datetime.utcnow() + dt.timedelta(days=91))
        route = f'/users/{user_public_id}/events/{event_url}/appointments'
        response = self.api.post(
            route,
            data=create_appointment_json(start=start.isoformat()),
            content_type='application/json')

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['status'], 'fail')
        self.assertEqual(data['message'], f"You may only schedule an "
                                          f"appointment within the next "
                                          f"{NEXT_X_DAYS} days in the future.")
