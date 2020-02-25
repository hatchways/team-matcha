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


def add_event(user_id,
              availability,
              name='my event',
              location='my home',
              description='A cool event',
              duration=60,
              url='mycoolevent',
              color='FFC0CB'):
    """Add's a row to the event table as well as the availability table."""
    event = Event(name=name,
                  location=location,
                  description=description,
                  duration=duration,
                  url=url,
                  color=color,
                  user_id=user_id,
                  availability=availability)
    db.session.add(event)
    db.session.add(availability)
    db.session.commit()
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
