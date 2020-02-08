from project.test.test_base import TestBase
from project import db
from project.api.models import User

def add_user(name, email):
    user = User(name=name, email=email)
    db.session.add(user)
    db.session.commit()
    return user

class UserTest(TestBase):

    def test_user(self):
        name = "kenny"
        email = "test@email.com"
        add_user(name, email)
        user = User.query.filter_by(name=name).first()

        self.assertEqual(user.name, name)
