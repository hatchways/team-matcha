from project.api import api
from flask import Blueprint
import jwt
from werkzeug.exceptions import BadRequest
# from calendar import NEXT_X_DAYS  # TODO fix import and remove placeholder


NEXT_X_DAYS = 90  # TODO this should be the exact same value as in
# TODO appointment_handler.py


errors_blueprint = Blueprint('errors', __name__)

class Error(Exception):
   """Base class for other exceptions"""
   pass

class BlacklistTokenError(Error):
   """Custom Error when Token has been blacklisted"""
   pass


class UrlContainsSpace(Error):
    """This is a custom error."""
    pass


class UserNotFound(Error):
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


class NoDayAvailable(Error):
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


class StartAfterEnd(Error):
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


class AppointmentAfterNext_X_DaysError(Error):
    """This is a custom error."""
    pass


@api.errorhandler(AppointmentAfterNext_X_DaysError)
def handle_appointment_after_next_x_days(error):
    """This is a custom error for Appointments POST and PUT requests that
    provides a 400 response when the start date is later than the NEXT_X_DAYS
    constant."""
    return {
        'status': 'fail',
        'message': f"You may only schedule an appointment within the next "
                   f"{NEXT_X_DAYS} days in the future."
    }, 400


class AppointmentNotAvailableError(BadRequest):
    """This is a custom error."""
    pass


@api.errorhandler(AppointmentNotAvailableError)
def handle_appointment_not_available(error):
    """This is a custom error for Appointments POST and PUT requests when
    the start time of the appointment falls outside of what is allowed."""
    return {
        'status': 'fail',
        'message': 'The provided start time and date is not allowed please '
                   'choose a valid start time and date and resubmit your '
                   'request.'
    }, 400
