import uuid

from flask import Blueprint, abort
from flask_restx import Resource, fields, marshal, reqparse
from project import  db
from  project.api import api
from project.decorators import token_required
from project.error_handlers import *
from project.models.user import User, add_user, update_user

users_blueprint = Blueprint('users', __name__)


#-------------------------------------------------------------------------------
# Serializers
#-------------------------------------------------------------------------------

user_model = api.model(
    'User', {
        'public_id':
        fields.String(description="unique identifier of the user"),
        'name':
        fields.String(required=True, description="The name of the user"),
        'email':
        fields.String(required=True, description="The unique email"),
        'img_url':
        fields.String(
            description="The image url of the user's Google account"),
    })

#-------------------------------------------------------------------------------
# Endpoints
#-------------------------------------------------------------------------------


@api.route('/users')
class UserList(Resource):
    @api.marshal_with(user_model)  #output validation
    @api.expect(user_model, validate=True)  #input validation
    def post(self):
        user = add_user(**api.payload)
        db.session.commit()
        return user, 201

    @api.marshal_with(user_model, as_list=True)
    def get(self):
        return User.query.all(), 200


@api.route('/users/<public_id>')
class Users(Resource):
    @api.marshal_with(user_model)
    def get(self, public_id):
        user = User.query.filter_by(public_id=public_id).first()
        if not user:
            raise UserNotFound
        return user, 200

    @token_required
    @api.marshal_with(user_model, skip_none=True)
    def put(self, public_id, current_user=None):

        if current_user.public_id != public_id:
            raise PermissionError

        user = User.query.filter_by(public_id=public_id).first()
        data = marshal(api.payload, user_model)
        if user is not None:
            user = update_user(user, data)
            return user, 200
        return {"error": "User not found"}, 404


@api.route('/users/details')
class UserDetail(Resource):
    @api.marshal_with(user_model, skip_none=True)
    @token_required
    def get(self, current_user=None):
        if current_user:
            return current_user, 200
        else:
            abort(400, "User not Found!")
