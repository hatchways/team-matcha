from test.test_base import TestBase
import json


class PingHandlerTest(TestBase):

    def test_user_not_on_team(self):
        response = self.api.post('/ping', data=json.dumps({'teamName': 1}))

        self.assertDictEqual(
            response.json, {
                'response': '1 is not part of the team, change your .env'})

    def test_user_is_on_team(self):
        response = self.api.post('/ping',
                                 data=json.dumps({'teamName': 'Shums'}))

        self.assertDictEqual(
            response.json,
            {'response': 'Shums is now part of the team'})
