import os

from flask import Flask
from flask_restx import Api, Resource
from flask_sqlalchemy import SQLAlchemy

# instantiate the db
db = SQLAlchemy()


def create_app(script_info=None):

    # instantiate the app
    app = Flask(__name__)

    # set up config
    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)

    # set up extensions
    db.init_app(app)

    # register blueprints here
    from project.api.home_handler import home_handler
    app.register_blueprint(home_handler)

    from project.api.ping_handler import ping_handler
    app.register_blueprint(ping_handler)

    from project.api.users_handler import users_blueprint
    app.register_blueprint(users_blueprint)

    from project.api.auth_handler import login_blueprint
    app.register_blueprint(login_blueprint)

    from project.error_handlers import errors_blueprint
    app.register_blueprint(errors_blueprint)

    from project.api.events_handler import events_blueprint
    app.register_blueprint(events_blueprint)

    from project.api.calendar_handler import calendar_blueprint
    app.register_blueprint(calendar_blueprint)

    from project.api import api
    api.init_app(app)
    return app
