from project.api import api
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


class NoDayAvailable(Exception):
    """This is a custom error."""
    pass


@api.errorhandler(NoDayAvailable)
def handle_no_days_available(error):
    """This is a custom error for Events POST and PUT requests to reject
    responses that have not selected at least one day to be available for."""
    return {
        'status': 'fail',
        'message': 'At least one day must be selected as available. Please '
                   'select at least one day and resubmit your request.'
    }, 400


class StartAfterEnd(Exception):
    """This is a custom error."""
    pass


@api.errorhandler(StartAfterEnd)
def handle_start_before_end(error):
    """This is a custom error for Events POST and PUT requests that responds
    with a 400 error when the start time is after the end time."""
    return {
        'status': 'fail',
        'message': 'The start time must be before the end time. Please resubmit'
                   ' your request with a valid start and end time.'
    }, 400
