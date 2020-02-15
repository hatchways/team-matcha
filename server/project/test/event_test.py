from project import db
from project.api.models import Availability, Event, User
from project.test.test_base import TestBase
from .availability_test import add_availability
from .user_test import add_user


def add_event(name='♪┏(・o･)┛♪┗ ( ･o･) ┓♪', location='my home',
              description='It will be cool show up!', url='myCoolParty',
              user_id=False, availability_id=False):
    """Add's a row to the event table."""
    if not user_id:
        add_user()
        user = User.query.filter(url=url).first()
        user_id = user.id

    if not availability_id:
        add_availability()
        availability = Availability.query.first()
        availability_id = availability.id

    event = Event(name, location, description, url, user_id, availability_id)
    db.session.add(event)
    db.session.commit()
    return event


class EventModelTest(TestBase):
    def test_event_model(self):
        """Tests whether the event model is working correctly."""
        name = '♪┏(・o･)┛♪┗ ( ･o･) ┓♪'
        url = 'myCoolParty'
        add_event()
        event = Event.query.filter(name=name).first()

        self.assertEqual(event.url, url)
