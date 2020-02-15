from project import db
from flask import current_app
import uuid
import jwt
import datetime
from project.error_handlers import *


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(128), unique=True)
    google_id = db.Column(db.String(128), unique=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    event = db.relationship('Event', backref='users')

    def __init__(self, name, email, google_id=None):
        self.public_id = uuid.uuid4()
        self.name = name
        self.email = email
        self.google_id = google_id

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """

        try:
            payload = jwt.decode(auth_token,
                                 current_app.config.get('SECRET_KEY'))
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                raise BlacklistTokenError
            else:
                return payload['sub']
        except jwt.ExpiredSignatureError:
            raise jwt.ExpiredSignatureError
        except jwt.InvalidTokenError:
            raise jwt.InvalidTokenError

    def encode_auth_token(self, user_id):
        """
        Encodes a auth token for user
        :params user id
        :return token|bytes

        :token-contents
            exp: expiration date of the token
            iat: the time the token is generated
            sub: the subject of the token (the user whom it identifies)
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=120),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(payload, current_app.config.get('SECRET_KEY'))
        except Exception as e:
            return e


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
    event = db.relationship('Event', backref='availability')

    def __init__(self, sunday, monday, tuesday, wednesday, thursday, friday,
                 saturday, start, end):
        self.sunday = sunday
        self.monday = monday
        self.tuesday = tuesday
        self.wednesday = wednesday
        self.thursday = thursday
        self.friday = friday
        self.saturday = saturday
        self.start = start
        self.end = end


class Timezone(db.Model):
    __tablename__ = "timezones"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    hours = db.Column(db.Integer, nullable=False)
    minutes = db.Column(db.Integer)
    dst_hours = db.Column(db.Integer, nullable=False)
    dst_minutes = db.Column(db.Integer)

    def __init__(self, name, hours, minutes, dst_hours, dst_minutes):
        self.name = name
        self.hours = hours
        self.minutes = minutes
        self.dst_hours = dst_hours
        self.dst_minutes = dst_minutes


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    location = db.Column(db.String(256))
    description = db.Column(db.String(1024))
    url = db.Column(db.String(32), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    availability_id = db.Column(db.Integer, db.ForeignKey('availability.id'),
                                nullable=False)

    def __init__(self, name, location, description, url, user_id,
                 availability_id):
        self.name = name
        self.location = location
        self.description = description
        self.url = url
        self.user_id = user_id
        self.availability_id = availability_id


class BlacklistToken(db.Model):
    """
    Token Model for storing JWT tokens
    """
    __tablename__ = 'blacklist_tokens'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: token: {}'.format(self.token)

    @staticmethod
    def check_blacklist(auth_token):
        # check whether auth token has been blacklisted
        res = BlacklistToken.query.filter_by(token=str(auth_token)).first()
        if res:
            return True
        else:
            return False

