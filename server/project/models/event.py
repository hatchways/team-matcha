from project import db
from sqlalchemy import inspect
from project.models.availability import Availability
import datetime as dt



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


def add_event(user_id: int, availability: Availability, name='My event',
              location='', description='', duration=60,
              url='myEvent', color='000000') -> Event:
    """
    Creates an Event, adds the created Event and availability param and returns the created Event.
    :param user_id: (int) foreign key to User
    :param availability: (Availability) to be used for foreign key
    :param name: (str) name of the event
    :param location: (str) location of the event
    :param description: (str) description of the event
    :param duration: (int) duration of the event in minutes
    :param url: (str) url suffix of the event must be unique
    :param color: color of the event in hexadecimal without the leading '#'
    :return: an Event
    """
    event = Event(name=name, location=location, description=description,
                  duration=duration, url=url, color=color, user_id=user_id,
                  availability=availability)
    db.session.add(event)
    db.session.add(availability)
    return event


def update_event(event, params):
    event_fields = inspect(Event).columns.keys()
    for key, value in params.items():
        if key in event_fields and value is not None and\
                key is not 'availability':
            setattr(event, key, value)
    if 'availability' in params:
        availability_fields = inspect(Availability).columns.keys()
        for key, value in params['availability'].items():
            if key in availability_fields and value is not None and\
                    key != 'days':
                setattr(event.availability, key, dt.time(value))
        if 'days' in params['availability']:
            for key, value in params['availability']['days'].items():
                if key in availability_fields and value is not None:
                    setattr(event.availability, key, value)
    db.session.commit()
    return event
