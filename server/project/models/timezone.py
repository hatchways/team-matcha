from project import db
import datetime as dt
from typing import Tuple


class Timezone(db.Model):
    __tablename__ = "timezones"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    offset = db.Column(db.Interval, nullable=False)
    dst_offset = db.Column(db.Interval)


def create_timezone(name: str, hours: str, minutes: str, dst_hours: str,
                    dst_minutes: str) -> Timezone:
    """
    Creates and adds a timezone object returns the created timezone
    :param name: the name of the timezone
    :param hours: hours portion of the offset
    :param minutes: minutes portion of the offset
    :param dst_hours: daylight savings hours
    :param dst_minutes: daylight savings minutes
    :return: Timezone object
    """
    timezone = Timezone(
        name=name,
        offset=dt.timedelta(hours=int(hours), minutes=int(minutes)),
        dst_offset=dt.timedelta(hours=int(dst_hours), minutes=int(dst_minutes)))
    db.session.add(timezone)
    return timezone


def hours_minutes(td: dt.timedelta) -> Tuple[int, int]:
    """
    Converts a timedelta to hours and minutes
    :param td: timedelta
    :return: tuple of integers
    """
    return td.days * 24 + td.seconds // 3600, (td.seconds//60) % 60
