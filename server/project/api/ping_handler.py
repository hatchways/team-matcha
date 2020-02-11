import json
import os

from flask import Blueprint, request
from flask_restx import Resource
from project.api import api

ping_handler = Blueprint('ping_handler', __name__)


@api.route('/ping')
class Ping(Resource):
    def post(self):
        TEAM_NAME = os.environ['TEAM_NAME']
        if request.method == 'POST':
            body = json.loads(request.get_data())
            if body['teamName'] in TEAM_NAME.split(','):
                return {'response': "{} is now part of the team".format(body['teamName'])}, 200
            else:
                return {'response': "{} is not part of the team, change your .env".format(body['teamName'])}, 400
