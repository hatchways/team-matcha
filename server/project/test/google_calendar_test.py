import datetime as dt
from requests import post
from project.test.test_base import TestBase
from unittest.mock import patch
from project.services.google_calendar import create_google_event


class GoogleCalendarTest(TestBase):
    def test_google_calendar_403(self):
        """Tests whether google is returning a 401 response."""
        email = 'calendapp.tm@gmail.com'
        url = f'https://www.googleapis.com/calendar/v3/calendars/{email}/events'
        response = post(url=url)
        self.assertEqual(response.status_code, 401)

    @patch('project.services.google_calendar.build')
    def test_create_event(self, mock_service):
        """Tests whether an event can be created successfully."""
        mock_service.return_value.\
            events.return_value.\
            insert.return_value.\
            execute.return_value = {'status': 'success', 'code': 200}  # TODO mock actual response
        response = create_google_event('',
                                       '',
                                       '',
                                       '',
                                       '',
                                       dt.datetime.now(dt.timezone.utc),
                                       dt.datetime.now(dt.timezone.utc) +
                                       dt.timedelta(hours=1),
                                       '',)
