from flask import Blueprint
from flask_restx import Resource, Api

home_handler = Blueprint('home_handler', __name__)
api = Api(home_handler)


@api.route('/welcome')
class Welcome(Resource):
    def get(self):
        return {'welcomeMessage': 'Step 1: Run the server (completed!)'}
