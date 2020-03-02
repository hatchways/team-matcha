from project import db
import datetime as dt
from project.models.participant import Participant
from typing import List


class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.DateTime(timezone=True), nullable=False)
    end = db.Column(db.DateTime(timezone=True), nullable=False)
    created = db.Column(db.DateTime(timezone=True), nullable=False)
    status = db.Column(db.Boolean(), nullable=False)  # True active False
                                                      # canceled
    comments = db.Column(db.String(1024))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    event = db.relationship('Event',
                            backref='appointments',
                            innerjoin=True,
                            cascade='all, delete-orphan',
                            single_parent=True,
                            uselist=False)


def add_appointment(event_id: int, participants: List[Participant],
                    start=dt.datetime.now(tz=dt.timezone.utc) +
                    dt.timedelta(days=1),
                    end=dt.datetime.now(dt.timezone.utc) +
                    dt.timedelta(days=1, hours=1),
                    created=dt.datetime.now(dt.timezone.utc),
                    status=True,
                    comments='') -> Appointment:
    """
    Creates an appointment, adds both the appointment and the participants and
    returns the created appointment.
    :param event_id: The id for the the associated event
    :param participants: A list of participants
    :param start: When the appointment starts in datetime
    :param end: When the appointment ends in datetime
    :param created: When the appointment was created in datetime
    :param status: True: the event is active, False: the event is canceled
    :param comments: The message to send to the event creator
    :return: An Appointment object
    """
    appointment = Appointment(start=start,
                              end=end,
                              created=created,
                              status=status,
                              comments=comments,
                              event_id=event_id)
    for participant in participants:
        db.session.add(participant)
        appointment.participants.append(participant)

    db.session.add(appointment)
    return appointment
