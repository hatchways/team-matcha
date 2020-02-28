import datetime as dt
from project import db
from project.models.appointment import Appointment, add_appointment
from project.models.participants import Participants, create_participant
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
        participant = Participants.query.filter_by(name=name).first()

        self.assertEqual(participant.email, email)

    def test_many_participants(self):
        """Tests whether an appointment can have many participants."""
        add_user()
        db.session.commit()
        user = User.query.first()
        availability = create_availability()
        add_event(user_id=user.id, availability=availability)
        db.session.commit()
        event = Event.query.first()
        name = ['User Jeff', 'Jeff User', 'Reff Usej']
        email = ['jeff@email.com', 'user@email.com', 'jeff@user.com']
        comments = 'I think this whole Jeff and User thing is getting ' \
                   'confusing.'
        add_appointment(event_id=event.id,
                        participants=[create_participant(name[i], email[i]) for
                                      i in range(2)],
                        comments=comments)
        db.session.commit()
        participants = db.session.query(Participants).\
            filter(Appointment.comments == comments)

        for j in range(2):
            self.assertEqual(participants[j].name, name[j])
            self.assertEqual(participants[j].email, email[j])
