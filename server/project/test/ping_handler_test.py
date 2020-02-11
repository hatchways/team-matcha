from project.test.test_base import TestBase
import json


class PingHandlerTest(TestBase):

    def test_user_not_on_team(self):
        response = self.api.post('/ping', data=json.dumps({'teamName': 1}),
                                 content_type="application/json")

        self.assertDictEqual(
            response.json, {
                'response': '1 is not part of the team, change your .env'})

    def test_user_is_on_team(self):
        response = self.api.post('/ping',
                                 data=json.dumps({'teamName': 'Brian'}),
                                 content_type="application/json")
        self.assertDictEqual(
            response.json,
            {'response': 'Brian is now part of the team'})

    def test_user_is_on_team(self):
        response = self.api.post('/ping',
                                 data=json.dumps({'teamName': 'Kenneth'}),
                                 content_type="application/json")

        self.assertDictEqual(
            response.json,
            {'response': 'Kenneth is now part of the team'})

    def test_user_is_on_team(self):
        response = self.api.post('/ping',
                                 data=json.dumps({'teamName': 'Gerardo'}),
                                 content_type="application/json")

        self.assertDictEqual(
            response.json,
            {'response': 'Gerardo is now part of the team'})
