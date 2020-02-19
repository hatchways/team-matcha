from project import db


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    location = db.Column(db.String(256))
    description = db.Column(db.String(1024))
    duration = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String(32), nullable=False, unique=True)
    colour = db.Column(db.String(6), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    availability_id = db.Column(db.Integer, db.ForeignKey('availability.id'),
                                nullable=False)
    availability = db.relationship('Availability', innerjoin=True,
                                   lazy='joined',
                                   backref=db.backref('event', uselist=False))


def add_event(user_id, availability, name='my event', location='my home',
              description='A cool event', duration=60, url='mycoolevent',
              colour='FFC0CB'):
    """Add's a row to the event table as well as the availability table."""
    event = Event(name=name, location=location, description=description,
                  duration=duration, url=url, colour=colour, user_id=user_id,
                  availability=availability)
    db.session.add(event)
    db.session.add(availability)
    return event
