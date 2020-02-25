import unittest
from project import create_app, db
from manage import seed_timezones

app = create_app()


class TimezoneTestBase(unittest.TestCase):
    """Test base to be used whenever timezones are needed. This test base will
    populate the timezones table and will significantly add to the time
    required to run a test."""
    def create_app(self):
        app.config.from_object('project.config.TestingConfig')
        return app

    def setUp(self):
        self.api = app.test_client()
        db.create_all()
        seed_timezones('project/db/timezones.csv')
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

