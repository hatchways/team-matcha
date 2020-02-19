from flask import Blueprint, abort
from flask_restx import Resource, fields
from project import db, api
import uuid
from project.api.models import User
from project.error_handlers import *

users_blueprint = Blueprint('users', __name__)


def add_user(params):
    name = params['name']
    email = params['email']
    user = User(name=name, email=email)
    db.session.add(user)
    db.session.commit()
    return user


# Used for both input and/or output validation
user_output = api.model(
    'User', {
        'public_id': fields.String(required=True),
        'name': fields.String(required=True),
        'email': fields.String(required=True),
    })

user_input = api.model('User', {
    'name': fields.String(required=True),
    'email': fields.String(required=True),
})


@api.route('/users')
class UserList(Resource):
    @api.marshal_with(user_output, envelope='data')  # output validation
    @api.expect(user_input, validate=True)  # input validation
    def post(self):
        data = api.payload
        return add_user(api.payload), 201

    @api.marshal_with(user_output, as_list=True,
                      envelope='data')  # output validation
    @token_required
    def get(self):
        return User.query.all(), 200


@api.route('/users/<public_id>')
class Users(Resource):
    @api.marshal_with(user_output, envelope='data')  # output validation
    def get(self, public_id):
        user = User.query.filter_by(public_id=public_id).first()
        if not user:
            abort(400, "User not Found!")
        return user, 200


@api.route('/users/details')
class UserDetail(Resource):
    @api.marshal_with(user_output, envelope='data')  #output validation
    @token_required
    def get(self, current_user):
        if current_user:
            return current_user, 200
        else:
            abort(400, "User not Found!")
