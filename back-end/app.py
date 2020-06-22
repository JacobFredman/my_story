from flask import Flask
from about_us import about_us
from cups_menage import cups_menage
from admin_cups_and_points import admin_cups_and_points
from admin_feedback_texts import admin_feedback_texts
from admin_report import admin_report
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

app.register_blueprint(admin_report)
app.register_blueprint(admin_feedback_texts)
app.register_blueprint(admin_cups_and_points)
app.register_blueprint(about_us)
app.register_blueprint(cups_menage)


@app.route('/a')
def aa():
    return 'Hello, a!'


@app.route('/')
def hello_world():
    return 'Hello, World!'
