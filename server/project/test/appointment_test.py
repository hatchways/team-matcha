import datetime as dt
from project import db
from project.models.appointment import Appointment, add_appointment
from project.models.participant import Participant, create_participant
from project.models.event import Event, add_event
from project.models.availability import Availability, create_availability
from project.models.user import User, add_user
from project.test.test_base import TestBase


class AppointmentModelTest(TestBase):
    def test_appointment_model(self):
        """Tests whether the appointment model is working correctly."""
        add_user()
        db.session.commit()
        user = User.query.first()
        availability = create_availability()
        add_event(user_id=user.id, availability=availability)
        db.session.commit()
        event = Event.query.first()
        participant = create_participant()
        start = dt.datetime(year=2020, month=3, day=1, hour=8)
        end = start + dt.timedelta(hours=1)
        created = dt.datetime.utcnow() - dt.timedelta(hours=1)
        add_appointment(event_id=event.id, participants=[participant],
                        start=start, end=end, created=created)
        db.session.commit()
        appointment = Appointment.query.filter_by(start=start).first()

        self.assertEqual(appointment.end, end)
        self.assertEqual(appointment.created, created)

    def test_multiple_participants(self):
        """Tests whether an appointment can have multiple participants."""
        add_user()
        db.session.commit()
        user = User.query.first()
        availability = create_availability()
        add_event(user_id=user.id, availability=availability)
        db.session.commit()
        event = Event.query.first()
        names = ['Rex', 'Fives', 'Echo', 'Dogma', 'Wolffe']
        emails = [f'{name}@trooper.com' for name in names]
        participants = [create_participant(name=names[i], email=emails[i])
                        for i in range(4)]
        add_appointment(event_id=event.id, participants=participants)
        db.session.commit()
        appointment = Appointment.query.first()

        for i in range(4):
            self.assertEqual(appointment.participants[i].name, names[i])
            self.assertEqual(appointment.participants[i].email, emails[i])
