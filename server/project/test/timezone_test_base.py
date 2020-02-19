import csv
from project.models.timezone import Timezone
import unittest
from project import create_app, db

# Import this test base if you need to use Timezones db

app = create_app()


def seed_timezones():
    """Creates the timezone table and populates it."""
    with open('project/db/timezones.csv') as csv_file:
        csv_reader = csv.reader(csv_file)
        next(csv_reader)
        for row in csv_reader:
            timezone = Timezone(*row)
            db.session.add(timezone)
    db.session.commit()
    return


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
        db.session.commit()
        seed_timezones()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

