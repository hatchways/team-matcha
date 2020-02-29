import datetime
import json
import time
from unittest.mock import Mock, patch
from unittest import mock

import jwt
from flask import current_app
from google.oauth2 import id_token
from project import db
from project.models.blacklist_token import BlacklistToken
from project.models.user import User
from project.test.test_base import TestBase



mock_exchange_auth_code = {
    'id_token': "SOME_ID_TOKEN",
    'access_token': "SOME_ACESS_TOKEN",
    'refresh_token': "SOME_REFRESH_TOKEN",
}

def register_user(self, name, email):

    mock_oauth2_resp = {
        'iss': 'https://accounts.google.com',
        'name': name,
        'email': email,
        'sub': "123456789",
        'picture': "SOME_IMAGE_URL",
    }

    @mock.patch.object(id_token,
                       'verify_oauth2_token',
                       return_value=mock_oauth2_resp)
    @mock.patch('project.api.auth_handler.exchange_auth_code',
                return_value=mock_exchange_auth_code)
    def post_login(_exchange, _mock_verify):
        return self.api.post('/login',
                             data=json.dumps({'code': 'SOME_AUTH_CODE'}),
                             content_type='application/json')

    return post_login()


class LoginTest(TestBase):
    def test_login_success(self):
        name = "Joe"
        email = "joe@email.com"
        response = register_user(self, name, email)
        data = json.loads(response.data.decode())
        user_id = User.decode_auth_token(data['auth_token'])
        user = User.query.get(user_id)

        self.assertEqual(response.status_code, 200)

        self.assertEqual(data['status'], 'success')

        self.assertEqual(data['message'], 'Successfully logged in')

        self.assertTrue('auth_token' in data)

        self.assertEqual(user.email, email)

    @mock.patch('project.api.auth_handler.exchange_auth_code',
                return_value=mock_exchange_auth_code)
    def test_invalid_google_auth_token_login(self, mock_exchage):
        name = "Joe"
        email = "joe@email.com"
        response = self.api.post('/login',
                                    data=json.dumps(
                                        {'code': 'SOME_AUTH_CODE'}),
                                    content_type='application/json')

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 401)

        self.assertEqual(data['message'], 'ValueError')


class Logout(TestBase):
    def test_logout_success(self):
        name = "Joe"
        email = "joe@email.com"
        resp_login = register_user(self, name, email)
        data = json.loads(resp_login.data.decode())
        auth_token = data['auth_token']
        response = self.api.post('/logout',
                                 headers={'x-access-token': auth_token})
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)

        self.assertEqual(data['status'], 'success')

        self.assertEqual(data['message'], 'Successfully logged out.')

        self.assertTrue(BlacklistToken.check_blacklist(auth_token))

    def test_expire_token_logout(self):
        name = "Joe"
        email = "joe@email.com"
        google_id = "123456789"
        token_payload = {
            'exp':
            datetime.datetime.utcnow() - datetime.timedelta(days=0, seconds=2),
            'iat':
            datetime.datetime.utcnow(),
            'sub':
            google_id
        }
        mock_response = jwt.encode(token_payload,
                                   current_app.config.get('SECRET_KEY'))
        with patch.object(User,
                          'encode_auth_token',
                          return_value=mock_response):

            response = register_user(self, name, email)
            data = json.loads(response.data.decode())
            auth_token = data['auth_token']

            response = self.api.post('/logout',
                                     headers={'x-access-token': auth_token})
            data = json.loads(response.data.decode())

            self.assertEqual(response.status_code, 401)

            self.assertEqual(data['status'], 'fail')

            self.assertEqual(data['message'],
                             'Signature expired. Please log in again.')

    def test_valid_blacklisted_token_logout(self):
        name = "Joe"
        email = "joe@email.com"
        response = register_user(self, name, email)
        data = json.loads(response.data.decode())
        auth_token = data['auth_token']

        #blacklist a valid token
        blacklist_token = BlacklistToken(auth_token)
        db.session.add(blacklist_token)
        db.session.commit()

        response = self.api.post('/logout',
                                 headers={'x-access-token': auth_token})

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 401)

        self.assertEqual(data['status'], 'fail')

        self.assertEqual(data['message'],
                         'Token blacklisted. Please log in again.')


class AuthorizationTest(TestBase):
    def test_valid_token_required_user_details(self):
        name = "Joe"
        email = "joe@email.com"
        resp_login = register_user(self, name, email)
        data = json.loads(resp_login.data.decode())
        auth_token = data['auth_token']

        response = self.api.get('/users/details',
                                headers={'x-access-token': auth_token})

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)

        self.assertEqual(name, data['name'])

        self.assertEqual(email, data['email'])

    def test_valid_blacklisted_token_user_details(self):
        name = "Joe"
        email = "joe@email.com"
        resp_login = register_user(self, name, email)
        data = json.loads(resp_login.data.decode())
        auth_token = data['auth_token']

        #blacklist a valid token
        blacklist_token = BlacklistToken(auth_token)
        db.session.add(blacklist_token)
        db.session.commit()

        response = self.api.get('/users/details',
                                headers={'x-access-token': auth_token})

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 401)

        self.assertEqual(data['status'], 'fail')

        self.assertEqual(data['message'],
                         'Token blacklisted. Please log in again.')
