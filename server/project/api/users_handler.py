from flask import Blueprint, request
from flask_restx import Resource, fields
from project.api import api
# from project.api.models import User

users_handler = Blueprint('users_handler', __name__)

user_fields = api.model('Resource', {
    'name': fields.String,
    'email': fields.String,
})

parser = api.parser()
parser.add_argument('name', type=str)
parser.add_argument('email', type=str)


# def add_user(params):
#     name = params['name']
#     email = params['email']
#     user = User(name=name, email=email)
#     db.session.add(user)
#     db.session.commit()
#     return user


@api.route('/users')
class Users(Resource):
    # @api.marshal_with(model, envelope='data')
    # @api.expect(user_fields, validate=True)
    # @api.marshal_with(user_fields)
    def post(self):
        data = api.payload
        print(data)

        response_object = {"status": "Fail", "message": "Invalid Payload"}
        if not data:
            return response_objet, 400

        name = data['name']
        email = data['email']
        response_object['status'] = 'Success'
        response_object['message'] = f'{name} was added'
        return response_object, 201

        # return add_user(api.payload), 201
