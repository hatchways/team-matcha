from datetime import datetime as dt, timezone, timedelta
import datetime

import time
import pytz


class Calendars():
    """
    The self.calendar_bit_field  stores the busy times of a calendar, where
    1 represents a busy time slot and 0 represents free.
    - Each bit marks a 15 (minimum resolution) min time slot.
      - The first bit represents 00:00am from Today. The second bit represents
      - 00:15 from TODAY and so on.
    """

    DAILY_SLOTS = 96  # 15 min is our minimum resolution so there is 96 slots in a day
    MAX_DAY_MASK = (1 << DAILY_SLOTS
                    ) - 1  #bit field, every slot for the day is flipped to 1
    SLOT_MINUTES = 30  # minutes of slots we want to return
    MIN_RESOLUTION = 15

    def __init__(self, today=dt.utcnow(), duration=None, next_x_days=90, timezone="UTC"):
        """
        params:
            today - datetime
            duration - duration of the Event booking
            next_x_days - number of days in the future to handle
        """
        # Now should be calcualted as the 00:00am of today
        self.timezone = pytz.timezone(timezone)
        self.today_start = self.start_of_day(today.astimezone(self.timezone) + datetime.timedelta(days=1) )
        self.next_days = [
            self.today_start + datetime.timedelta(days=x)
            for x in range(next_x_days)
        ]
        self.duration = duration
        self.calendar_bit_field = 0
        self.dur_slot = duration // self.MIN_RESOLUTION

    def str_to_date(self, date):
        return (dt.strptime(date, '%Y-%m-%dT%H:%M:%SZ'))

    def start_of_day(self, date):
        return date.replace(hour=0, minute=0, second=0, microsecond=0)

    def all_avail_time_slots(self):
        result = {}
        for day in self.next_days:
            result[day.strftime("%Y-%m-%d")] = self.days_avail_slots(day)
        return result

    def days_avail_slots(self, date):
        def bitExtracted(number, k, p):
            """
            Get the Bits from number in range p to p+k
            params:
                number - Bitfield
                k - nubmer of bits
                p - startig position of bit
            return:
                - bit field
            """
            return (((1 << k) - 1) & (number >> (p)))

        def is_free(cur_bit_field, cur_mask):
            return ~cur_bit_field & cur_mask == cur_mask

        date = self.start_of_day(date)
        days_from_today = (date - self.today_start).days
        days_avail_bit_field = bitExtracted(self.calendar_bit_field,
                                            self.DAILY_SLOTS,
                                            days_from_today * self.DAILY_SLOTS)
        cur_mask = (1 << self.dur_slot) - 1
        cur_time = date
        result = []

        while cur_mask <= self.MAX_DAY_MASK:
            if is_free(days_avail_bit_field, cur_mask):
                result.append({
                    "hour": cur_time.hour,
                    "minute": cur_time.minute
                })
            # move the mask to the next time slot
            cur_mask <<= (self.SLOT_MINUTES // self.MIN_RESOLUTION)
            cur_time = cur_time + timedelta(minutes=self.SLOT_MINUTES)
        return result

    def date_to_index(self, date):
        """datetime to time slot index in self.calendar_bit_field
        Example:
        now is 2020-02-21T00:00:00Z

        date: 2020-02-22T00:00:00Z
        returns 96 since (24h * (60min / 15min)) = 96
        """
        timedelta = date.astimezone(self.timezone) - self.today_start
        return round(timedelta.total_seconds() // 60) // self.MIN_RESOLUTION

    def set_busy(self, start, end):
        """
        Set appropriate bits in self.calendar_bit_field to represent
        time from start to end as unavailable (1).
        params: start and end are datetime RFC3339 formated Strings
        returns: None
        side effects: updates self.calendar bit_field
        """
        def mask(start, end):
            mask = 1
            duration = end - start
            for i in range(duration - 1):
                mask = (mask << 1) | 1
            return mask

        s = self.date_to_index(start)
        e = self.date_to_index(end)
        if s > 0:
            mask = mask(s, e)
            self.calendar_bit_field |= mask << s

    def block_events(self, busy):
        """
        params: a list of dicts with set of keys #(start, end) and values are
        datetime RFC3339 formated strings.
        returns: None
        side effects: updates self.calendar bit_field
        """
        for b in busy:
            start = self.str_to_date(b['start']).astimezone(self.timezone)
            end = self.str_to_date(b['end']).astimezone(self.timezone)
            self.set_busy(start, end)

    def block_unavail_days(self, avail):
        def mask_from_avail_times(start, end):
            start = ((start.hour * 60) + start.minute) // self.MIN_RESOLUTION
            end = ((end.hour * 60) + end.minute) // self.MIN_RESOLUTION
            if start < end:
                # 111111111110000000000111111111111
                mask = (((1 << (end - start)) - 1) << start) ^ self.MAX_DAY_MASK
            else:
                # 000111111111111111111111111110000
                #set left zeroes
                mask = self.MAX_DAY_MASK >> (self.DAILY_SLOTS - start)
                #set right zeroes
                mask = ((1 << end)-1) ^ mask
            return mask

        a = [
            avail.monday,
            avail.tuesday,
            avail.wednesday,
            avail.thursday,
            avail.friday,
            avail.saturday,
            avail.sunday,
        ]

        # Convert avail start and end time to requested tiemzone
        start = dt.now(avail.start.tzinfo).replace(
            hour=avail.start.hour,
            minute=avail.start.minute,
        ).astimezone(self.timezone)

        end = dt.now(avail.end.tzinfo).replace(
            hour=avail.end.hour,
            minute=avail.end.minute,
       ).astimezone(self.timezone)

        for day in self.next_days:
            day = self.start_of_day(day)
            days_from_today = (day - self.today_start).days
            if not a[day.weekday()]:
                mask = (1 << self.DAILY_SLOTS) - 1
                self.calendar_bit_field |= (
                    mask << (self.DAILY_SLOTS * days_from_today))
            else:
                mask = mask_from_avail_times(start, end)
                self.calendar_bit_field |= mask << (self.DAILY_SLOTS *
                                                    days_from_today)
