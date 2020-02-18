import datetime as dt
from project import db
from project.api.models import Availability, Event
from project.test.test_base import TestBase
from project.test.event_test import add_event


def add_availability(sunday=False, monday=True, tuesday=True, wednesday=True,
                     thursday=True, friday=True, saturday=False,
                     start=dt.time(8), end=dt.time(17), event_id=0):
    """Adds a row to the availability table."""
    if not event_id:
        add_event()
        event = Event.query.first()
        event_id = event.id
    availability = Availability(sunday, monday, tuesday, wednesday, thursday,
                                friday, saturday, start, end, event_id)
    db.session.add(availability)
    return availability


class AvailabilityModelTest(TestBase):
    def test_availability_model(self):
        """Tests whether the availability model is working correctly."""
        sunday = True
        start = dt.time(6)
        end = dt.time(15)
        add_availability(sunday=sunday, start=start, end=end)
        availability = Availability.query.filter_by(start=start).first()

        self.assertEqual(availability.sunday, sunday)
        self.assertEqual(availability.end, end)
