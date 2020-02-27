import datetime as dt
from project import db
from project.models.appointment import Appointment, add_appointment
from project.models.participant import Participant, create_participant
from project.models.event import Event, add_event
from project.models.availability import Availability, create_availability
from project.models.user import User, add_user
from project.test.test_base import TestBase


class ParticipantModelTest(TestBase):
    def test_participant_model(self):
        """Tests whether the participant model is working correctly."""
        add_user()
        db.session.commit()
        user = User.query.first()
        availability = create_availability()
        add_event(user_id=user.id, availability=availability)
        db.session.commit()
        event = Event.query.first()
        name = 'User Jeff'
        email = 'jeff@email.com'
        add_appointment(event_id=event.id,
                        participants=[create_participant(name=name,
                                                         email=email)])
        db.session.commit()
        participant = Participant.query.filter_by(name=name).first()

        self.assertEqual(participant.email, email)
