import json
import datetime as dt
from project import db
from project.test.test_base import TestBase
from project.models.availability import Availability, create_availability
from project.models.event import Event, add_event
from project.models.user import User, add_user
from project.models.appointment import Appointment, add_appointment
from project.models.participant import Participant, create_participant


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
                        participants=create_participant(name=name),
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
