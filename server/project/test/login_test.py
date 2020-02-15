import json

from project import db
from project.api.models import User
from project.test.test_base import TestBase
import uuid


def add_user(name, email):
    user = User(name=name, email=email)
    db.session.add(user)
    db.session.commit()
    return user
