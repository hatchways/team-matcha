import unittest
from project import create_app, db
from project.api import api
from flask_restx import Api

app = create_app()
# api = Api(app)

class TestBase(unittest.TestCase):
    def create_app(self):
        app.config.from_object('project.config.TestingConfig')
        return app

    def setUp(self):
        self.api = app.test_client()
        db.create_all()
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

