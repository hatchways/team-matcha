from project import db


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
