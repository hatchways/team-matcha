from project import db


Appointments_Participants = db.Table('appointments_participants',
                                     db.Column('appointment_id',
                                               db.Integer,
                                               db.ForeignKey('appointments.id'),
                                               primary_key=True),
                                     db.Column('participant_id',
                                               db.Integer,
                                               db.ForeignKey('participants.id'),
                                               primary_key=True))


class Participants(db.Model):
    __tablename__ = 'participants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    appointment = db.relationship('Appointment',
                                  backref='participants',
                                  secondary=Appointments_Participants,
                                  cascade='all')


def create_participant(name='Not Brian', email='test@email.com') ->\
        Participants:
    """
    Creates a participant and returns the created participant.
    :param name: Name of the participant
    :param email: Email of the participant
    :return: A participant object
    """
    participant = Participants(name=name, email=email)
    return participant
