from project import db


class Participant(db.Model):
    __tablename__ = 'participants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.id'))
    appointment = db.relationship('Appointment', backref='participants',
                                  cascade='all, delete-orphan',
                                  single_parent=True, uselist=False)


def create_participant(name='Not Brian', email='test@email.com') -> Participant:
    """
    Creates a participant and returns the created participant.
    :param name: Name of the participant
    :param email: Email of the participant
    :return: A participant object
    """
    participant = Participant(name=name, email=email)
    return participant
