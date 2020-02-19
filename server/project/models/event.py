from project import db
from sqlalchemy import inspect
from project.models.availability import Availability


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    location = db.Column(db.String(256))
    description = db.Column(db.String(1024))
    duration = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String(32), nullable=False, unique=True)
    color = db.Column(db.String(6), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    availability_id = db.Column(db.Integer,
                                db.ForeignKey('availability.id'),
                                nullable=False)
    availability = db.relationship('Availability',
                                   innerjoin=True,
                                   lazy='joined',
                                   cascade="all, delete-orphan",
                                   single_parent=True,
                                   backref=db.backref('event', uselist=False))

    def __iter__(self):
        values = vars(self)
        for attr in self.__table__.columns.keys():
            if attr in values:
                yield attr, values[attr]

    def logme(self):
        return dict(self)


def add_event(user_id: int, availability: Availability, name='my event',
              location='my home', description='A cool event', duration=60,
              url='mycoolevent', color='FFC0CB') -> Event:
    """
    Creates an Event, adds the created Event and availability param and returns the created Event.
    :param user_id: (int) foreign key to User
    :param availability: (Availability) to be used for foreign key
    :param name: (str) name of the event
    :param location: (str) location of the event
    :param description: (str) description of the event
    :param duration: (int) duration of the event in minutes
    :param url: (str) url suffix of the event
    :param color: color of the event in hexadecimal without the leading '#'
    :return: the created Event
    """
    event = Event(name=name, location=location, description=description,
                  duration=duration, url=url, color=color, user_id=user_id,
                  availability=availability)
    db.session.add(event)
    db.session.add(availability)
    return event


def update_event(event, params):
    fields = inspect(Event).columns.keys()
    fk = ['availability']
    for key, value in params.items():
        if key in fields and value is not None and key not in fk:
            setattr(event, key, value)
    db.session.commit()
    return event
