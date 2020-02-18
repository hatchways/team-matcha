from functools import wraps
from flask import request, jsonify
from project.api.models import User


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # get auth token
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return {'message': 'Token is missing!'}, 401

        resp = User.decode_auth_token(token)

        current_user = User.query.get(resp)

        return f(current_user=current_user, *args, **kwargs)

    return decorated

