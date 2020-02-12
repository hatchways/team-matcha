import json
import os

from flask import Blueprint, request
from flask_restx import Resource, Api, fields
from project import api

ping_handler = Blueprint('ping_handler', __name__)


@api.route('/ping')
class Ping(Resource):
    def post(self):
        team_name = os.environ['TEAM_NAME']
        body = api.payload
        if body['teamName'] in team_name.split(','):
            return {
                'response':
                "{} is now part of the team".format(body['teamName'])
            }, 200
        else:
            return {
                'response':
                "{} is not part of the team, "
                "change your .env".format(body['teamName'])
            }, 400
