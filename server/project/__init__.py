import os

from flask import Flask
from flask_restx import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from project.api.home_handler import api, home_handler
from project.api.ping_handler import ping_handler
from project.api import api
from project.api.users_handler import users_handler

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
    api.init_app(app)

 # register blueprints
    app.register_blueprint(home_handler)
    app.register_blueprint(ping_handler)
    app.register_blueprint(users_handler)

    return app
