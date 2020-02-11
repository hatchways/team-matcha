import json

from flask import Blueprint, jsonify, request
from project import db
from project.api.models import User
from project.test.test_base import TestBase


def add_user(name, email):
    user = User(name=name, email=email)
    db.session.add(user)
    db.session.commit()
    return user

class UserTest(TestBase):

    def test_user(self):
        name = "kenny"
        email = "test@email.com"
        add_user(name, email)
        user = User.query.filter_by(name=name).first()

        self.assertEqual(user.name, name)


class AddUserTest(TestBase):
    def test_add_user(self):
        """Ensure a new user can be added to the database"""
        response = self.api.post(
            '/users',
            data=json.dumps({'name': "Joe",
                             'email': "test@email.com"}),
            content_type='application/json')

        data = json.loads(response.data.decode())
        print(data)


        self.assertEqual(response.status_code, 201)

        self.assertIn('test@email.com was added', data['message'])

        self.assertIn('Success', data['status'])

        self.assertEqual(User.query.filter_by(name="Joe").first() ,"Joe")
