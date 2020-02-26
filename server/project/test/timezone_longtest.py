from project.models.timezone import Timezone, hours_minutes
from project.test.timezone_test_base import TimezoneTestBase
import json


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


class TimezoneGetTest(TimezoneTestBase):
    def test_all_timezones(self):
        """Tests whether the format of the returned timezone is correct."""
        response = self.api.get('/timezones', content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(len(data), Timezone.query.count())

    def test_timezone_marshal(self):
        """Tests whether the format of the returned timezone is correct."""
        response = self.api.get('/timezones', content_type='application/json')
        data = json.loads(response.data.decode())
        eastern_response = None  # get rid of warning

        for row in data:
            if row['name'] == 'America/Toronto':
                eastern_response = row
                break

        eastern_query = Timezone.query.filter_by(name='America/Toronto').first()

        self.assertEqual(eastern_response['offset hours'],
                         hours_minutes(eastern_query.offset)[0])
        self.assertEqual(eastern_response['offset minutes'],
                         hours_minutes(eastern_query.offset)[1])
        self.assertEqual(eastern_response['dst offset hours'],
                         hours_minutes(eastern_query.dst_offset)[0])
        self.assertEqual(eastern_response['dst offset minutes'],
                         hours_minutes(eastern_query.dst_offset)[1])
