import json
from unittest.mock import Mock, patch

from google.oauth2 import id_token
from project.test.test_base import TestBase


class LoginTest(TestBase):
    def test_login_success(self):
        name = "Joe"
        email = "joe@email.com"
        mock_response = {
            'iss': 'https://accounts.google.com',
            'name': name,
            'email': email,
            'sub': '12345',
        }
        with patch.object(id_token,
                          'verify_oauth2_token',
                          return_value=mock_response):

            response = self.api.post('/login',
                                     data=json.dumps({
                                         'tokenId':
                                         "SOME_AUTH_TOKEN",
                                     }),
                                     content_type='application/json')
            data = json.loads(response.data.decode())

            self.assertEqual(response.status_code, 200)

            self.assertEqual(data['status'], 'success')

            self.assertEqual(data['message'], 'Successfully logged in')

            self.assertTrue('auth_token' in data)

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

    @patch.object(id_token, 'verify_oauth2_token')
    def test_roken_required_endpoint(self, verify_oauth2_token):
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
