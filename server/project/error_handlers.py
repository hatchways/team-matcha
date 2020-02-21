from project import api
from flask import Blueprint
import jwt
from werkzeug.exceptions import BadRequest


errors_blueprint = Blueprint('errors', __name__)

class Error(Exception):
   """Base class for other exceptions"""
   pass

class BlacklistTokenError(Error):
   """Custom Error when Token has been blacklisted"""
   pass


class UrlContainsSpace(Exception):
    """This is a custom error."""
    pass


class UserNotFound(Exception):
    """This is a custom error."""
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


# @api.errorhandler(BadRequest)
# def handle_url_contains_space(error):
#     """This is a custom error."""
#     return {
#         'status': 'fail',
#         'message': 'The url parameter contains a space please remove it and '
#                    'resubmit your request.'
#     }, 400


@api.errorhandler(UrlContainsSpace)
def handle_url_contains_space(error):
    return {
               'status': 'fail',
               'message': 'The url parameter contains a space please remove it '
                          'and resubmit your request.'
           }, 400


@api.errorhandler(UserNotFound)
def handle_user_not_found(error):
    return {
        'status': 'fail',
        'message': 'User not Found!'
    }, 400
