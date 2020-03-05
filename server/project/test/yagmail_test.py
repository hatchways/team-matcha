from __future__ import print_function
from unittest import TestCase
import os
import yagmail as yag


###########
# Warning #
###########

# For the test email account "Less secure app access is currently allowed"
# Go to https://myaccount.google.com/lesssecureapps while logged in to change
# this setting once a better solution is implemented.

###############
# End Warning #
###############


class YagmailTest(TestCase):
    GOOGLE_EMAIL = os.environ.get('GOOGLE_EMAIL')
    GOOGLE_PASS = os.environ.get('GOOGLE_PASS')
    SCOPES = ['https://www.googleapis.com/auth/gmail.modify']

    def test_login(self):
        """Tests whether gmail login is working correctly."""
        calendapp = yag.SMTP(self.GOOGLE_EMAIL, self.GOOGLE_PASS)
        recipient = 'test@email.com'
        test_email = calendapp.send(to=recipient,
                                    subject='Test email',
                                    contents='This is a test email.',
                                    preview_only=True)
        self.assertEqual(len(test_email[0]), 1)
        self.assertEqual(test_email[0][0], recipient)
