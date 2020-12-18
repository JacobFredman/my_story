from flask import Flask, g, send_from_directory
from flask_cors import CORS
import mysql.connector
from staticData import connDict

app = Flask(__name__)
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
