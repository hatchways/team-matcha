
from flask import Blueprint, current_app, request
from flask_restx import Resource, fields
from google.auth.transport import requests
from google.oauth2 import id_token
from project import db
from project.api import api
from project.models.blacklist_token import BlacklistToken
from project.models.user import User, add_user
from project.models.creds import add_cred
from project.decorators import token_required
from  project.services.google_calendar import fetch_free_busy

login_blueprint = Blueprint('login', __name__)

login_input = api.model('login', {
    'tokenId': fields.Raw(required=True),
    'profileObj': fields.String(required=True),
    'access_token': fields.String(required=True),
})


@api.route('/login')
class Login(Resource):
    @api.expect(login_input)  #input validation
    def post(self):
        # (Receive token by HTTPS POST)
        data = api.payload
        token = data['tokenId']
        profileObj = data['profileObj']
        access_token = data['access_token']
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
            user_id = idinfo['sub']
            #Query for user
            user = User.query.filter_by(google_id=user_id).first()
            if not user:
                user = add_user(idinfo['name'], idinfo['email'])
                user.google_id = user_id
                user.img_url = profileObj['imageUrl']
                cred = add_cred(access_token=access_token)
                user.cred = (cred)
                db.session.commit()

            # Create and send session token
            jwt_token = user.encode_auth_token(user.id)
            return {
                'status': 'success',
                'message': 'Successfully logged in',
                'public_id': user.public_id,
                'auth_token': jwt_token.decode()
            }, 200
        except ValueError:
            # Invalid token
            return {'message': 'ValueError'}, 401


@api.route('/logout')
class Logout(Resource):
    @token_required
    def post(self, current_user):
        auth_token = request.headers['x-access-token']
        # mark the token as blacklisted
        blacklist_token = BlacklistToken(auth_token)
        try:
            # insert the token
            db.session.add(blacklist_token)
            db.session.commit()
            # print(f"logout handler:{auth_token}")
            responseObject = {
                'status': 'success',
                'message': 'Successfully logged out.'
            }
            return responseObject, 200
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': e
            }
            return responseObject, 401
