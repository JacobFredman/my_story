import mysql.connector
from staticData import connDict
from flask import g, current_app as app
from sendEmail import getEmailSettings


def get_conn():
    if not hasattr(g, 'conn'):
        g.conn = mysql.connector.connect(**connDict)
        g.conn._open_connection()
    return g.conn


# @app.teardown_appcontext
# def close_conn(error):
#     if hasattr(g, 'conn'):
#         g.conn.close()
