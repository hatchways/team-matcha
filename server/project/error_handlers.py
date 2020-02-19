from project import api
from flask import Blueprint
import jwt


errors_blueprint = Blueprint('errors', __name__)

class Error(Exception):
   """Base class for other exceptions"""
   pass

class BlacklistTokenError(Error):
   """Raised when Token has been blacklisted"""
   pass

class AccessDeniedError(Error):
   """Raised when  has been blacklisted"""
   pass

@api.errorhandler(PermissionError)
def handle_permissionError(error):
    return {
        'status': 'fail',
        'message': "You do not have permission to access this content"
    }, 403

@api.errorhandler(BlacklistTokenError)
def handle_blacklistTokenError(error):
    '''This is a custom error'''

    return {
        'status': 'fail',
        'message': 'Token blacklisted. Please log in again.'
    }, 401


@api.errorhandler(jwt.ExpiredSignatureError)
def handle_jwt_ExpiredSignatureError(error):
    '''This is a custom error jwt.ExpiredSignatureError'''
    return {
        'status': 'fail',
        'message': 'Signature expired. Please log in again.'
    }, 401


@api.errorhandler(jwt.InvalidTokenError)
def handle_jwt_InvalidTokenError(error):
    '''This is a custom error for jwt.InvalidTokenError'''
    return {
        'status': 'fail',
        'message': 'Invalid token. Please log in again.'
    }, 401

