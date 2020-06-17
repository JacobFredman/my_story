from flask import Flask
from about_us import about_us
from cups_menage import cups_menage
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


app.register_blueprint(about_us)
app.register_blueprint(cups_menage)


@app.route('/a')
def aa():
    return 'Hello, a!'


@app.route('/')
def hello_world():
    return 'Hello, World!'
