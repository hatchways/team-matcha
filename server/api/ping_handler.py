import json
from flask import jsonify, request, Blueprint
from config import TEAM_NAME
ping_handler = Blueprint('ping_handler', __name__)


@ping_handler.route('/ping', methods=['POST'])
def ping():
    if request.method == 'POST':
        body = json.loads(request.get_data())
        if body['teamName'] in TEAM_NAME.split(','):
            return jsonify({'response': "{} is now part of the team".format(body['teamName'])}), 200
        else:
            return jsonify({'response': "{} is not part of the team, change your .env".format(body['teamName'])}), 400
