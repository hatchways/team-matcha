import datetime as dt
from project import db
from project.models.availability import Availability, create_availability
from project.models.event import Event, add_event
from project.models.user import User, add_user
from project.test.test_base import TestBase


class AvailabilityModelTest(TestBase):
    def test_availability_model(self):
        """Tests whether the availability model is working correctly."""
        sunday = True
        start = dt.time(6)
        end = dt.time(15)
        add_user()
        user_id = User.query.first().id
        availability = create_availability(sunday=sunday, start=start, end=end)
        add_event(user_id=user_id, availability=availability)
        availability = Availability.query.filter_by(start=start).first()

        self.assertEqual(availability.sunday, sunday)
        self.assertEqual(availability.end, end)

    def test_availability_foreign_key(self):
        """Tests whether the foreign key relationship is working between
        Availability and Event."""
        add_user()
        user_id = User.query.first().id
        start = dt.time(6)
        availability = create_availability(start=start)
        url = 'acleverurl'
        add_event(url=url, user_id=user_id, availability=availability)
        db.session.commit()
        event, availability = db.session.query(Event, Availability).join()\
            .first()

        self.assertEqual(availability.start, start)
        self.assertEqual(event.url, url)
