
from flask import Flask, g
from about_us import about_us
from cups_menage import cups_menage
from admin_cups_and_points import admin_cups_and_points
from admin_feedback_texts import admin_feedback_texts
from admin_report import admin_report
from extportToExcel import extportToExcel
# from user import user
from flask_cors import CORS
from authlib.integrations.flask_client import OAuth
from user import user
import mysql.connector

app = Flask(__name__)
# oauth = OAuth(app)
# app.config['SERVER_NAME'] = 'localhost'
# app.config['SESSION_COOKIE_DOMAIN'] = 'localhost'


CORS(app,  supports_credentials=True)


# app.register_blueprint(user)
app.register_blueprint(user)
app.register_blueprint(extportToExcel)
app.register_blueprint(admin_report)
app.register_blueprint(admin_feedback_texts)
app.register_blueprint(admin_cups_and_points)
app.register_blueprint(about_us)
app.register_blueprint(cups_menage)


@app.route('/a', methods=['post'])
def aa():
    return 'Hello, a!'


@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(threaded=True, host='127.0.0.1', port='3500')


# # AS simeple as possbile flask google oAuth 2.0
# from flask import Flask, redirect, url_for, session
# from authlib.integrations.flask_client import OAuth
# import os
# from datetime import timedelta


# # # dotenv setup
# # from dotenv import load_dotenv
# # load_dotenv()

# # decorator for routes that should be accessible only by logged in users
# from auth_decorator import login_required


# # App config
# app = Flask(__name__)
# # Session config
# # app.secret_key = os.getenv("APP_SECRET_KEY")
# app.secret_key = "APP_SECRET_KEY"
# app.config['SESSION_COOKIE_NAME'] = 'google-login-session'
# app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

# # oAuth Setup
# oauth = OAuth(app)
# google = oauth.register(
#     name='google',
#     client_id="453061761258-m3sij6fvt3jf3biao5dg7r6vqnrsq4n3.apps.googleusercontent.com",
#     client_secret="fSDHb_YwpgyJ3GmDK9vMrX6j",
#     access_token_url='https://accounts.google.com/o/oauth2/token',
#     access_token_params=None,
#     authorize_url='https://accounts.google.com/o/oauth2/auth',
#     authorize_params=None,
#     api_base_url='https://www.googleapis.com/oauth2/v1/',
#     # This is only needed if using openId to fetch user info
#     userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
#     client_kwargs={'scope': 'openid email profile'},
# )


# @app.route('/')
# # @login_required
# def hello_world():
#     email = dict(session)['profile']['email']
#     return f'Hello, you are logge in as {email}!'


# @app.route('/login11')
# def login():
#     google = oauth.create_client('google')  # create the google oauth client
#     redirect_uri = url_for('authorize', _external=True)
#     return google.authorize_redirect(redirect_uri)


# @app.route('/authorize')
# def authorize():
#     google = oauth.create_client('google')  # create the google oauth client
#     # Access token from google (needed to get user info)
#     token = google.authorize_access_token()
#     # userinfo contains stuff u specificed in the scrope
#     resp = google.get('userinfo')
#     user_info = resp.json()
#     user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
#     # Here you use the profile/user data that you got and query your database find/register the user
#     # and set ur own data in the session not the profile from google
#     session['profile'] = user_info
#     # make the session permanant so it keeps existing after broweser gets closed
#     session.permanent = True
#     return redirect('/')


# @app.route('/logout')
# def logout():
#     for key in list(session.keys()):
#         session.pop(key)
#     return redirect('/')
