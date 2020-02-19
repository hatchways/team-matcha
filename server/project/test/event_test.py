from project import db
from project.api.models import Event, User
from project.test.test_base import TestBase
from project.test.user_test import add_user


def add_event(name='myevent', location='my home', description='A cool event',
              duration=60, url='mycoolevent', colour='FFC0CB', user_id=0):
    """Add's a row to the event table."""
    if not user_id:
        add_user()
        user = User.query.first()
        user_id = user.id

    event = Event(name, location, description, duration, url, colour, user_id)
    db.session.add(event)
    return event


class EventModelTest(TestBase):
    def test_event_model(self):
        """Tests whether the event model is working correctly."""
        name = '♪┏(・o･)┛♪┗ ( ･o･) ┓♪'
        url = 'myCoolParty'
        add_event(url=url, name=name)
        event = Event.query.filter_by(url=url).first()

        self.assertEqual(event.name, name)
