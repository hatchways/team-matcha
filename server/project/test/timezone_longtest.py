from project.models.timezone import Timezone, create_timezone, hours_minutes
from project.test.timezone_test_base import TimezoneTestBase


class TimezoneModelTest(TimezoneTestBase):
    def test_timezone_model(self):
        """Tests whether the timezone table was created successfully."""
        eastern = 'America/Toronto'
        pacific = 'America/Los_Angeles'
        est = Timezone.query.filter_by(name=eastern).first()
        pst = Timezone.query.filter_by(name=pacific).first()

        self.assertEqual(hours_minutes(est.offset)[0], -5)
        self.assertEqual(hours_minutes(est.dst_offset)[0], -4)
        self.assertEqual(hours_minutes(pst.offset)[0], -8)
        self.assertEqual(hours_minutes(pst.dst_offset)[0], -7)
