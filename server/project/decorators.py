import datetime
from functools import wraps
from flask import request, jsonify
from project.api.models import User

import jwt


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return {'message': 'Token is missing!'}, 401

        try:
            sub = User.decode_auth_token(token)
            current_user = User.query.get(sub)
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user=current_user, *args, **kwargs)

    return decorated
