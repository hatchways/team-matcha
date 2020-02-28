from flask import Blueprint
from flask_restx import Resource
from project.api import api

home_handler = Blueprint('home_handler', __name__)


@api.route('/welcome')
class Welcome(Resource):
    def get(self):
        return {'welcomeMessage': 'Step 1: Run the server (completed!)'}
