import json

from flask import Blueprint, jsonify, request
from project import db
from project.api.models import User
from project.test.test_base import TestBase
import uuid


def add_user(name, email):
    user = User(public_id=uuid.uuid4(), name=name, email=email)
    db.session.add(user)
    db.session.commit()
    return user


class UserModelTest(TestBase):
    def test_user_model(self):
        name = "kenny"
        email = "test@email.com"
        add_user(name, email)
        user = User.query.filter_by(name=name).first()

        self.assertEqual(user.name, name)
        self.assertEqual(user.email, email)


class AddUserTest(TestBase):
    def test_add_user(self):
        """Ensure a new user can be added to the database"""
        response = self.api.post('/users',
                                 data=json.dumps({
                                     'name': "Joe",
                                     'email': "joe@email.com"
                                 }),
                                 content_type='application/json')

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 201)

        self.assertEqual(User.query.filter_by(name="Joe").first().name, "Joe")

    def test_bad_params_values(self):
        response = self.api.post('/users',
                                 data=json.dumps({
                                     'name': 1,
                                     'email': 1,
                                 }),
                                 content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_bad_params_name(self):
        response = self.api.post('/users',
                                 data=json.dumps({
                                     'bad_field': "Joe",
                                     'email': "test@email.com",
                                 }),
                                 content_type='application/json')

        self.assertEqual(response.status_code, 400)


class GetUserTest(TestBase):
    def test_get_user(self):
        name = "Joe"
        email = "joe@email.com"
        user = add_user(name, email)
        response = self.api.get(f'/users/{user.public_id}')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(name, data['data']['name'])
        self.assertEqual(email, data['data']['email'])

    def test_get_non_existing_user(self):
        response = self.api.get(f'/users/{9999}')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
