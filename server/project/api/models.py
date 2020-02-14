from project import db
import uuid


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(128), unique=True)
    google_id = db.Column(db.String(128), unique=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, name, email, google_id=None):
        self.public_id = uuid.uuid4()
        self.name = name
        self.email = email
        self.google_id = google_id



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
