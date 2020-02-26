from flask import Blueprint
from flask_restx import Resource, fields
from project import api, db
from project.models.timezone import Timezone, hours_minutes

timezones_blueprint = Blueprint('timezone', __name__)


class OffsetHours(fields.Raw):
    """A field that converts a timedelta to an integer hour."""
    def format(self, value):
        return hours_minutes(value)[0]


class OffsetMinutes(fields.Raw):
    """A field that converts a timedelta to an integer minute."""
    def format(self, value):
        return hours_minutes(value)[1]


timezones_model = api.model(
    'Timezone', {
        'name': fields.String(description='The name of the timezone',
                              example='America/Toronto'),
        'offset hours': OffsetHours(description='The UTC offset hours only.',
                                    attribute='offset', required=True,
                                    example=-5),
        'offset minutes': OffsetMinutes(description='The UTC offset minutes '
                                                    'only.',
                                        attribute='offset', required=True,
                                        example=0),
        'dst offset hours': OffsetHours(description='The daylight savings time '
                                                    'UTC offset hours only.',
                                        attribute='dst_offset', example=-4),
        'dst offset minutes': OffsetMinutes(description='The UTC offset minutes'
                                                        ' only.',
                                            attribute='dst_offset', example=0)})


@api.route('/timezones')
class Timezones(Resource):
    @api.marshal_with(timezones_model)
    def get(self):
        """Returns a list of all of the timezones."""
        return Timezone.query.all(), 200
