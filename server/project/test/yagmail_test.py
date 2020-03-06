from __future__ import print_function
from unittest import TestCase
import os
import yagmail as yag
import codecs
from string import Template
import datetime as dt

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


    def test_template_generation(self):
        """Tests whether an email can be successfully generated from an email
        template."""
        template = Template(codecs.open(
            'project/resources/templates/email_template.html',
            'r',
            'utf-8'
        ).read())
        start = dt.datetime.now(dt.timezone.utc)
        end = dt.datetime.now(dt.timezone.utc) + dt.timedelta(hours=1)
        content = template.substitute(event_name='A cool event',
                                      event_description='You should come it '
                                                        'will be a blast!',
                                      event_location='Everywhere!',
                                      appointment_start=start.strftime(
                                          '%A, %B %-d, %Y, %I:%M %p'),
                                      appointment_end=end.strftime(
                                          '%A, %B %-d, %Y, %I:%M %p'),
                                      participant_name='Little Johnny',
                                      appointment_comments="I haven't seen you "
                                                           "in forever I am so "
                                                           "looking forward to "
                                                           "it!",)

        self.assertTrue('A cool event' in content)
