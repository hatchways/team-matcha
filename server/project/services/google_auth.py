import requests
import json
from flask import current_app


def exchange_auth_code(code):
    payload = {
        "code": code,
        "client_id": current_app.config['OAUTH_CLIENT_ID'],
        "client_secret": current_app.config['OAUTH_CLIENT_SECRET'],
        "redirect_uri": "http://localhost:3000",
        "grant_type": "authorization_code"
    }
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    response = requests.post('https://oauth2.googleapis.com/token',
                             data=payload,
                             headers=headers)
    credentials = response.json()
    return credentials

def refresh_access_token(refresh_token):
    payload = {
        "client_id": current_app.config['OAUTH_CLIENT_ID'],
        "client_secret": current_app.config['OAUTH_CLIENT_SECRET'],
        "refresh_token": refresh_token,
        "grant_type": "refresh_token"
    }
    response = requests.post('https://oauth2.googleapis.com/token',
                             data=payload,
                             headers=headers)

