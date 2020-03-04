from __future__ import print_function

import datetime
from datetime import datetime as dt, timedelta

import google.oauth2.credentials
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/calendar']


def fetch_free_busy(api_key, user_email):
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """

    creds = google.oauth2.credentials.Credentials(api_key, scopes=SCOPES)
    service = build('calendar', 'v3', credentials=creds)
    now = datetime.datetime.utcnow().isoformat(
    ) + 'Z'  # 'Z' indicates UTC time
    start = dt.utcnow()
    end = start + timedelta(days=90)
    body = {
        "timeMin": start.strftime('%Y-%m-%dT%H:%M:%SZ'),
        "timeMax": end.strftime('%Y-%m-%dT%H:%M:%SZ'),
        "items": [{
            "id": user_email
        }]
    }
    response = service.freebusy().query(body=body).execute()
    busy = response[u'calendars'][user_email][u'busy']

    return busy
