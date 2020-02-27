import datetime as dt
from project import db


class Availability(db.Model):
    __tablename__ = 'availability'

    id = db.Column(db.Integer, primary_key=True)
    sunday = db.Column(db.Boolean, nullable=False)
    monday = db.Column(db.Boolean, nullable=False)
    tuesday = db.Column(db.Boolean, nullable=False)
    wednesday = db.Column(db.Boolean, nullable=False)
    thursday = db.Column(db.Boolean, nullable=False)
    friday = db.Column(db.Boolean, nullable=False)
    saturday = db.Column(db.Boolean, nullable=False)
    start = db.Column(db.Time, nullable=False)
    end = db.Column(db.Time, nullable=False)


def create_availability(sunday=False, monday=True, tuesday=True, wednesday=True,
                        thursday=True, friday=True, saturday=False,
                        start=dt.time(8), end=dt.time(17)):
    """
    Only creates an instance of the Availability class and returns it.
    :param sunday: (Bool) whether the event can be scheduled on Sunday
    :param monday: (Bool) whether the event can be scheduled on Monday
    :param tuesday: (Bool) whether the event can be scheduled on Tuesday
    :param wednesday: (Bool) whether the event can be scheduled on Wednesday
    :param thursday: (Bool) whether the event can be scheduled on Thursday
    :param friday: (Bool) whether the event can be scheduled on Friday
    :param saturday: (Bool) whether the event can be scheduled on Saturday
    :param start: (dt.time) start of the event
    :param end: (dt.time) end of the event
    :return: An Availability
    """
    availability = Availability(sunday=sunday, monday=monday, tuesday=tuesday,
                                wednesday=wednesday, thursday=thursday,
                                friday=friday, saturday=saturday, start=start,
                                end=end)
    return availability
