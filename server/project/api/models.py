from project import db
import uuid


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(128), unique=True)
    google_id = db.Column(db.String(128), unique=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, name, email):
        self.public_id = uuid.uuid4()
        self.name = name
        self.email = email
