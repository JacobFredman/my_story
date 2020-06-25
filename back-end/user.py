from authlib.integrations.flask_client import OAuth
from flask import Blueprint, request, jsonify, json, redirect, url_for, current_app as app
# from app import oauth
user = Blueprint('user', __name__)
oauth = OAuth(app)


google = oauth.register(
    name='google',
    client_id="GOOGLE_CLIENT_ID",
    client_secret="GOOGLE_CLIENT_SECRET",
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    # This is only needed if using openId to fetch user info
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    client_kwargs={'scope': 'openid email profile'},
)


@user.route('/abcde', methods=['POST'])
def aaa():
    cookies = request.cookies.get('cookie2')
    return 'abcde'


@user.route('/login')
def login():
    redirect_uri = url_for('authorize', _external=True)
    return oauth.twitter.authorize_redirect(redirect_uri)


@user.route('/authorize')
def authorize():
    token = oauth.twitter.authorize_access_token()
    resp = oauth.twitter.get('account/verify_credentials.json')
    profile = resp.json()
    # do something with the token and profile
    return redirect('/')
