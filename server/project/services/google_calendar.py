from __future__ import print_function

import datetime
from datetime import datetime as dt, timedelta
from project.models.participant import Participant

import google.oauth2.credentials
from googleapiclient.discovery import build

from project.models.user import User

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


def create_google_event(creds: User.cred,
                        user_email: str,
                        event_name: str,
                        location: str,
                        description: str,
                        start: dt,
                        end: dt,
                        participant_email: str):
    """
    Creates an events for the appointment and returns TODO
    :param creds: our api key
    :param user_email: the email for the User that created the vent
    :param event_name: the name of the event
    :param location: the location of the event
    :param description: the description for the event
    :param start: the start time for the event
    :param end: the end time for the event
    :param participant_email: the email of the participant for the appointment
    :return: TODO
    """
    credentialss = google.oauth2.credentials.Credentials(creds.access_token,
                                                         scopes=SCOPES)
    service = build('calendar', 'v3', credentials=credentialss)

    event = {
        'summary': event_name,
        'location': location,
        'description': description + '\n\n' + 'This event was created by '
                                              'www.calendapp.com',
        'start': {
            'dateTime': start.isoformat(),
        },
        'end': {
            'dateTime': end.isoformat(),
        },
        'attendees': [
            {'email': user_email},
            {'email': participant_email},
        ],
        'reminders': {
            'useDefault': True,
        },
    }

    insert = service.events().insert(calendarId='primary',
                                     body=event,
                                     sendNotifications=True)
    response = insert.execute()
    return response
