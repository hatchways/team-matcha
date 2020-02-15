import datetime

import jwt
from flask import Blueprint, current_app
from flask_restx import Resource, fields
from google.auth.transport import requests
from google.oauth2 import id_token
from project import api, db
from project.api.models import User
from project.api.users_handler import add_user

login_blueprint = Blueprint('login', __name__)

login_input = api.model('login', {
    'tokenId': fields.Raw(required=True),
})


@api.route('/login')
class Login(Resource):
    @api.expect(login_input)  #input validation
    def post(self):
        # (Receive token by HTTPS POST)
        data = api.payload
        token = data['tokenId']
        try:
            # Specify the CLIENT_ID of the app that accesses the backend:
            idinfo = id_token.verify_oauth2_token(
                token, requests.Request(),
                current_app.config['OAUTH_CLIENT_ID'])

            if idinfo['iss'] not in [
                    'accounts.google.com', 'https://accounts.google.com'
            ]:
                raise ValueError('Wrong issuer.')

            # ID token is valid. Get the user's Google Account ID from the decoded token.
            userid = idinfo['sub']
            #Query for user
            user = User.query.filter_by(google_id=userid).first()
            if not user:
                user = {
                    'name': idinfo['name'],
                    'email': idinfo['email'],
                }
                user = add_user(user)
                user.google_id = userid
                db.session.commit()

            # Create and send session token
            jwt_token = user.encode_auth_token(user.id)
            return {
                'status': 'success',
                'message': 'Successfully logged in',
                'auth_token': jwt_token.decode('UTF-8')
            }, 200
        except ValueError:
            # Invalid token
            return {'message': 'ValueError'}, 401
