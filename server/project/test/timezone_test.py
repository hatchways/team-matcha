import csv
from project.api.models import Timezone
from project.test.timezone_test_base import TimezoneTestBase


class TimezoneModelTest(TimezoneTestBase):
    def test_timezone_table(self):
        """Tests whether the timezone table was created successfully."""
        with open('project/db/timezones.csv') as csv_file:
            csv_reader = csv.reader(csv_file)
            next(csv_reader)
            counter = 0
            for row in csv_reader:
                counter += 1
        self.assertEqual(Timezone.query.count(), counter)
