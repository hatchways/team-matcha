from flask import Blueprint
from flask_restx import Resource, fields
from project.api import api

users_handler = Blueprint('users_handler', __name__)

model = api.model('Model', {
    'name': fields.String,
    'email': fields.String,
})


@api.route('/users')
class Users(Resource):
    @api.marshal_with(model, envelope='data')
    def post(self):
        data = api.payload

        response_object = {
            "status": "Fail",
            "messag": "Invalid Payload"
        }
        if not data:
            return response_objet, 400

        name = data['name']
        email = data['email']
        response_object['status'] = 'Success'
        response_object['message'] = f'{name} was added'
        return response_object, 201
