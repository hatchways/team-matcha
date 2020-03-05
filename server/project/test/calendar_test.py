import datetime
from datetime import datetime as dt

from project.calendars import Calendars
from project.models.availability import Availability
from project.test.test_base import TestBase


def init_avail(sunday=True,
               monday=True,
               tuesday=True,
               wednesday=True,
               thursday=True,
               friday=True,
               saturday=True,
               start=datetime.time(8),
               end=datetime.time(17)):

    availability = Availability(sunday=sunday,
                                monday=monday,
                                tuesday=tuesday,
                                wednesday=wednesday,
                                thursday=thursday,
                                friday=friday,
                                saturday=saturday,
                                start=start,
                                end=end)
    return availability


class CalendarTest(TestBase):
    def test_fridays_unavailable(self):
        avail = init_avail(friday=False)
        next_x_days = 10
        event_duration = 60
        today = dt.strptime("2020-02-20T00:00:00Z", '%Y-%m-%dT%H:%M:%SZ')

        c = Calendars(today=today,
                     duration=event_duration,
                     next_x_days=next_x_days)
        c.block_unavail_days(avail)
        calendar = c.all_avail_time_slots()

        self.assertTrue('2020-02-21' in calendar)
        self.assertEqual(calendar['2020-02-21'], [])

        self.assertTrue('2020-02-28' in calendar)
        self.assertEqual(calendar['2020-02-28'], [])

    def test_multiple_days_unavailable(self):
        avail = init_avail(monday=False, wednesday=False, friday=False)
        next_x_days = 10
        event_duration = 60
        today = dt.strptime("2020-02-20T00:00:00Z", '%Y-%m-%dT%H:%M:%SZ')

        c = Calendars(today=today,
                     duration=event_duration,
                     next_x_days=next_x_days)
        c.block_unavail_days(avail)
        calendar = c.all_avail_time_slots()

        self.assertTrue('2020-02-21' in calendar)
        self.assertEqual(calendar['2020-02-21'], [])

        self.assertTrue('2020-02-24' in calendar)
        self.assertEqual(calendar['2020-02-24'], [])

        self.assertTrue('2020-02-26' in calendar)
        self.assertEqual(calendar['2020-02-26'], [])

        self.assertTrue('2020-02-28' in calendar)
        self.assertEqual(calendar['2020-02-28'], [])

    def test_blocking_one_event(self):
        busy = [
            {
                "start": "2020-02-21T01:00:00Z",
                "end": "2020-02-21T02:00:00Z"
            },
        ]
        next_x_days = 1
        event_duration = 30
        today = dt.strptime("2020-02-20T00:00:00Z", '%Y-%m-%dT%H:%M:%SZ')

        c = Calendars(today=today,
                     duration=event_duration,
                     next_x_days=next_x_days)
        c.block_events(busy)
        calendar = c.all_avail_time_slots()

        self.assertTrue('2020-02-21' in calendar)
        self.assertEqual(calendar['2020-02-21'][0], {"hour": 0, "minute": 0})
        self.assertEqual(calendar['2020-02-21'][1], {"hour": 0, "minute": 30})
        self.assertEqual(calendar['2020-02-21'][2], {"hour": 2, "minute": 0})


    def test_blocking_multiple_event(self):
        busy = [
            {# Busy from 01:00 to 02:00
                "start": "2020-02-21T01:00:00Z",
                "end": "2020-02-21T02:00:00Z"
            },
            {# Busy from 01:00 to 02:00
                "start": "2020-02-22T01:00:00Z",
                "end": "2020-02-22T02:00:00Z"
            },
        ]
        next_x_days = 2
        event_duration = 30
        today = dt.strptime("2020-02-20T00:00:00Z", '%Y-%m-%dT%H:%M:%SZ')

        c = Calendars(today=today,
                     duration=event_duration,
                     next_x_days=next_x_days)
        c.block_events(busy)
        calendar = c.all_avail_time_slots()

        # Day 1
        self.assertTrue('2020-02-21' in calendar)
        self.assertEqual(calendar['2020-02-21'][0], {"hour": 0, "minute": 0})
        self.assertEqual(calendar['2020-02-21'][1], {"hour": 0, "minute": 30})
        self.assertEqual(calendar['2020-02-21'][2], {"hour": 2, "minute": 0})


        # Day 2
        self.assertTrue('2020-02-22' in calendar)
        self.assertEqual(calendar['2020-02-22'][0], {"hour": 0, "minute": 0})
        self.assertEqual(calendar['2020-02-22'][1], {"hour": 0, "minute": 30})
        self.assertEqual(calendar['2020-02-22'][2], {"hour": 2, "minute": 0})

    def test_event_and_availability_blocking(self):
        avail = init_avail(friday=False, start=datetime.time(9), end=datetime.time(17))
        # Busy from 09:00 to 12:00
        busy = [
            {
                "start": "2020-02-21T09:00:00Z",
                "end": "2020-02-21T12:00:00Z"
            },
            {
                "start": "2020-02-22T09:00:00Z",
                "end": "2020-02-22T12:00:00Z"
            },
        ]
        next_x_days = 2
        event_duration = 30
        today = dt.strptime("2020-02-20T00:00:00Z", '%Y-%m-%dT%H:%M:%SZ')

        c = Calendars(today=today,
                     duration=event_duration,
                     next_x_days=next_x_days)
        c.block_unavail_days(avail)
        c.block_events(busy)
        calendar = c.all_avail_time_slots()

        # Day 1
        self.assertTrue('2020-02-21' in calendar)
        self.assertEqual(calendar['2020-02-21'], [])


        # Day 2
        self.assertTrue('2020-02-22' in calendar)
        self.assertEqual(calendar['2020-02-22'][0], {"hour": 12, "minute": 0})
        self.assertEqual(calendar['2020-02-22'][1], {"hour": 12, "minute": 30})
        self.assertEqual(calendar['2020-02-22'][2], {"hour": 13, "minute": 0})
