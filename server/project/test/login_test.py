import json
from unittest.mock import Mock, patch

from google.oauth2 import id_token
from project.test.test_base import TestBase
from project.api.models import User
import time


def seed_valid_login(self, name, email):
    mock_response = {
        'iss': 'https://accounts.google.com',
        'name': name,
        'email': email,
        'sub': "123456789",
    }
    with patch.object(id_token,
                      'verify_oauth2_token',
                      return_value=mock_response):

        response = self.api.post('/login',
                                 data=json.dumps({
                                     'tokenId': "SOME_AUTH_TOKEN",
                                 }),
                                 content_type='application/json')
        return response

def seed_valid_login(self, name, email):
    mock_response = {
        'iss': 'https://accounts.google.com',
        'name': name,
        'email': email,
        'sub': "123456789",
    }
    with patch.object(id_token,
                      'verify_oauth2_token',
                      return_value=mock_response):

        response = self.api.post('/login',
                                 data=json.dumps({
                                     'tokenId': "SOME_AUTH_TOKEN",
                                 }),
                                 content_type='application/json')
        return response


class LoginTest(TestBase):
    def test_login_success(self):
        name = "Joe"
        email = "joe@email.com"
        response = seed_valid_login(self, name, email)
        data = json.loads(response.data.decode())
        user_id = User.decode_auth_token(data['auth_token'])
        user = User.query.get(user_id)

        self.assertEqual(response.status_code, 200)

        self.assertEqual(data['status'], 'success')

        self.assertEqual(data['message'], 'Successfully logged in')

        self.assertTrue('auth_token' in data)

        self.assertEqual(user.email, email)

    def test_invalid_login(self):
        with patch.object(id_token, 'verify_oauth2_token') as mock_method:
            mock_method.raiseError.side_effect = Mock(
                side_effect=Exception(ValueError))
            name = "Joe"
            email = "joe@email.com"
            response = self.api.post('/login',
                                     data=json.dumps({
                                         'tokenId':
                                         "SOME_INVALID_ID_TOKEN",
                                     }),
                                     content_type='application/json')

            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 401)

            self.assertEqual(data['message'], 'ValueError')


class Logout(TestBase):
    def test_logout_success(self):
        name = "Joe"
        email = "joe@email.com"
        resp_login = seed_valid_login(self, name, email)
        data = json.loads(resp_login.data.decode())
        jwt_token = data['auth_token']
        response = self.api.post('/logout',
                                headers={'x-access-token': jwt_token})
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)

        self.assertEqual(data['status'], 'success')

        self.assertEqual(data['message'], 'Successfully logged out.')

    def test_invalid_logout(self):
        name = "Joe"
        email = "joe@email.com"
        response = seed_valid_login(self, name, email)
        data = json.loads(response.data.decode())
        jwt_token = data['auth_token']

        time.sleep(6)
        response = self.api.post('/logout',
                                headers={'x-access-token': jwt_token})
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code , 401)

        self.assertEqual(data['status'], 'fail')

        self.assertEqual(data['message'], 'Signature expired. Please log in again.')



class AuthorizationTest(TestBase):
    @patch.object(id_token, 'verify_oauth2_token')
    def test_token_required_endpoint(self, verify_oauth2_token):
        name = "Joe"
        email = "joe@email.com"
        verify_oauth2_token.return_value = {
            'iss': 'https://accounts.google.com',
            'name': name,
            'email': email,
            'sub': '12345',
        }
        # Login or create user
        resp_login = self.api.post('/login',
                                   data=json.dumps({
                                       'tokenId':
                                       "SOME_VALID_ID_TOKEN",
                                   }),
                                   content_type='application/json')
        data = json.loads(resp_login.data.decode())

        # Authenticated user gets detail
        jwt_token = data['auth_token']
        response = self.api.get('/users/details',
                                headers={'x-access-token': jwt_token})

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)

        self.assertEqual(name, data['data']['name'])

        self.assertEqual(email, data['data']['email'])
