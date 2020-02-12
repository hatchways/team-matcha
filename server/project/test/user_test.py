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
        print(data)

        self.assertEqual(response.status_code, 201)


        self.assertEqual(User.query.filter_by(name="Joe").first().name, "Joe")


    def test_bad_parameter_values(self):
        """Ensure invalid payload returns 400"""
        response = self.api.post('/users',
                                 data=json.dumps({
                                     'name': 1,
                                     'email': 1,
                                 }),
                                 content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_bad_parameter_names(self):
        """Ensure invalid payload returns 400"""
        response = self.api.post('/users',
                                 data=json.dumps({
                                     'bad_field': "Joe",
                                     'email': "test@email.com",
                                 }),
                                 content_type='application/json')

        self.assertEqual(response.status_code, 400)


# class GetUserTest(TestBase):
#     def test_get_user(self):
#         """Ensure a user can be retrieved""""
#         add_user(name, email)
