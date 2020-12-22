from flask import Flask, g, send_from_directory, request
from flask_cors import CORS
import mysql.connector
from staticData import connDict

app = Flask(__name__)
# app = Flask(__name__, static_folder="build")
# app = Flask(__name__, static_folder="build/static", template_folder="build")
CORS(app, supports_credentials=True)


def get_db_conn():
    if not hasattr(g, "conn"):
        g.conn = mysql.connector.connect(**connDict)
        g.conn._open_connection()
    return g.conn


@app.teardown_appcontext
def close_db_conn(error):
    if hasattr(g, "conn"):
        g.conn.close()
