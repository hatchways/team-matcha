from test.test_base import TestBase


class HomeHandlerTest(TestBase):

    def test_welcome(self):
        response = self.api.get('/welcome')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json['welcomeMessage'],
            'Step 1: Run the server (completed!)')
