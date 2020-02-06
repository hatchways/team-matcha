from flask import Flask
from api.ping_handler import ping_handler
from api.home_handler import home_handler


app = Flask(__name__)


app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

