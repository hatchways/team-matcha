from flask import Blueprint, request
from flask_restx import Resource, fields, Api
from project import db
from project.api.models import User
import uuid

users_blueprint = Blueprint('users', __name__)
api = Api(users_blueprint)


def add_user(params):
    name = params['name']
    email = params['email']
    user = User(name=name, email=email)
    db.session.add(user)
    db.session.commit()
    return user


#Used for both input and/or output validation
user_output = api.model('User', {
    'name': fields.String(required=True),
    'email': fields.String(required=True),
})

user_input = api.model('User', {
    'name': fields.String(required=True),
    'email': fields.String(required=True),
})


@api.route('/users')
class UserList(Resource):
    @api.marshal_with(user_output, envelope='data')  #output validation
    @api.expect(user_input, validate=True)  #input validation
    def post(self):
        data = api.payload
        return add_user(api.payload), 201


@api.route('/users/<user_id>')
class Users(Resource):
    @api.marshal_with(user_output, envelope='data')  #output validation
    def get(self, user_id):
        user = User.query.get(user_id)
        return user, 200
