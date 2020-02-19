import uuid
from project import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(128), unique=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    events = db.relationship('Event', lazy='joined')

    def __init__(self, public_id, name, email):
        self.public_id = public_id
        self.name = name
        self.email = email


def add_user(name='kenny', email='test@email.com'):
    user = User(public_id=uuid.uuid4(), name=name, email=email)
    db.session.add(user)
    return user
