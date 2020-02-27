from project import db
from project.models.user import User, add_user
from project.models.creds import Credential, add_cred
from project.test.test_base import TestBase

class CredModelTest(TestBase):
    def test_credential_creation(self):
        name = "kenny"
        email = "test@email.com"
        user = add_user(name=name, email=email)
        cred = add_cred()
        user.cred = cred
        db.session.commit()

        user = User.query.get(user.id)
        self.assertEqual(user.cred, cred)

