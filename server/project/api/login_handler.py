from flask import Blueprint, current_app
from flask_restx import Resource, fields
from google.auth.transport import requests
from google.oauth2 import id_token
from project import api
from project.api.models import User

login_blueprint = Blueprint('login', __name__)

login_input = api.model('login', {
    'tokenId': fields.Raw(required=False),
})


@api.route('/login')
class Login(Resource):
    # @api.expect(login_input, validate=False)  #input validation
    def post(self):
        # (Receive token by HTTPS POST)
        data = api.payload
        print(data)
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
            user = User.query.filter_by(google_id=userid)
            return idinfo, 200
        except ValueError:
            # Invalid token
            return {'message': 'ValueError'}, 401
