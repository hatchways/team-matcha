from project import db


class Credential(db.Model):
    __tablename__ = "credentials"

    id = db.Column(db.Integer, primary_key=True)
    access_token = db.Column(db.String(2048), unique=True, nullable=False)
    refresh_token = db.Column(db.String(2048), unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # def __init__(self, api_key=access_token, refresh_token=None):
    #     self.api_key = api_key
    #     self.refresh_token = refresh_token


def add_cred(access_token="MY_API_KEY", refresh_token=None):
    cred = Credential(access_token=access_token, refresh_token=refresh_token)
    db.session.add(cred)
    return cred
