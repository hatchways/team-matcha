import json

from project import db
from project.api.models import User
from project.test.test_base import TestBase


def add_user(name='kenny', email='test@email.com'):
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
        auth_token = user.encode_auth_token(user.id)

        self.assertEqual(user.name, name)

        self.assertEqual(user.email, email)

        self.assertTrue(isinstance(auth_token, bytes))

        self.assertTrue(
            User.decode_auth_token(auth_token.decode("utf-8")) == 1)


class UserCreateTest(TestBase):
    def test_add_user(self):
        response = self.api.post('/users',
                                 data=json.dumps({
                                     'name': "Joe",
                                     'email': "joe@email.com",
                                     'bad_param': "badfsdf"
                                 }),
                                 content_type='application/json')

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 201)

        self.assertEqual(User.query.filter_by(name="Joe").first().name, "Joe")

    def test_bad_params_values(self):
        response = self.api.post('/users',
                                 data=json.dumps({
                                     'name': 1234,
                                     'email': 1234,
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


class UserGetTest(TestBase):
    def test_get_user(self):
        name = "Joe"
        email = "joe@email.com"
        user = add_user(name, email)
        response = self.api.get(f'/users/{user.public_id}')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)

        self.assertEqual(name, data['name'])

        self.assertEqual(email, data['email'])

    def test_get_list_of_users(self):
        user = add_user("Joe", "Joe@email.com")
        user = add_user("Shmoe", "Shmoe@email.com")
        user = add_user("Doe", "Doe@email.com")
        response = self.api.get(f'/users')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(data), 3)

        query = User.query.all()
        self.assertEqual(len(query), 3)

    def test_get_non_existing_user(self):
        response = self.api.get(f'/users/{9999}')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 400)

        self.assertEqual(data['message'], "User not Found!")


class UserPutTest(TestBase):
    def test_update_user_successf(self):
        user = add_user("Doe", "Doe@email.com")
        auth_token = user.encode_auth_token(user.id)

        response = self.api.put(f'/users/{user.public_id}',
                                headers={'x-access-token': auth_token},
                                data=json.dumps({
                                    'name': "Not Joe",
                                    'email': 'Doe@gmail.com'
                                }),
                                content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)

        updated_user = User.query.get(user.id)
        self.assertEqual(updated_user.name, "Not Joe")

    def test_updaet_user_extraneous_params(self):
        user = add_user("Doe", "Doe@email.com")
        auth_token = user.encode_auth_token(user.id)

        response = self.api.put(f'/users/{user.public_id}',
                                headers={'x-access-token': auth_token},
                                data=json.dumps({
                                    'name': "Not Joe",
                                    'email': 'Doe@gmail.com',
                                    'weird_param1': "blahblah",
                                    'weird_param2': "blahblah",
                                    'weird_param3': "blahblah",
                                }),
                                content_type='application/json')

        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)

        updated_user = User.query.get(user.id)
        self.assertEqual(updated_user.name, "Not Joe")


    def test_update_user_invalid_permission(self):
        user = add_user("Doe", "Doe@email.com")
        user2 = add_user("Joe", "shmoe@email.com")
        auth_token = user.encode_auth_token(user.id)

        response = self.api.put(f'/users/{user2.public_id}',
                                headers={'x-access-token': auth_token},
                                data=json.dumps({
                                    'name': "ChangedName",
                                    'email': 'shmoe@email.com'
                                }),
                                content_type='application/json')
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 403)

        self.assertEqual(data['message'],
                         "You do not have permission to access this content")
