import datetime as dt
from project import db
from project.api.models import Availability
from project.test.test_base import TestBase


def add_availability(sunday, monday, tuesday, wednesday, thursday, friday,
                     saturday, start, end):
    availability = Availability(sunday, monday, tuesday, wednesday, thursday,
                                friday, saturday, start, end)
    db.session.add(availability)
    db.session.commit()
    return availability


class AvailabilityModelTest(TestBase):
    def test_availability_model(self):
        sunday = False
        monday = True
        tuesday = True
        wednesday = True
        thursday = True
        friday = True
        saturday = False
        start = dt.time(8)
        end = dt.time(17)
        add_availability(sunday, monday, tuesday, wednesday, thursday, friday,
                         saturday, start, end)
        availability = Availability.query.filter_by(start=start).first()
        self.assertEqual(availability.sunday, sunday)
        self.assertEqual(availability.monday, monday)
        self.assertEqual(availability.tuesday, tuesday)
        self.assertEqual(availability.wednesday, wednesday)
        self.assertEqual(availability.thursday, thursday)
        self.assertEqual(availability.friday, friday)
        self.assertEqual(availability.saturday, saturday)
        self.assertEqual(availability.start, start)
        self.assertEqual(availability.end, end)
