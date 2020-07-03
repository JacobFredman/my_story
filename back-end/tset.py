# from app import get_db_conn
from staticData import connDict
import mysql.connector

conn = mysql.connector.connect(connDict)

myList = [(1, 0, 0), (2, 1, 1), (3, 0, 0), (4, 0, 0), (5, 7, 0),
          (6, 0, 0), (7, 2, 0), (8, 5, 1), (9, 4, 1), (10, 12, 1), (11, 0, 0)]

val = 0

user = 'SSGMwIZ3xKOVkrOJmoDAJEe9o0W2'


def user_exists(user):
    # conn._open_connection()
    sql = "select exists(select *  from user where user.user_name = %s);"
    cursor = get_db_conn().cursor()
    try:
        cursor.execute(sql, (user))
        rows = cursor.fetchall()
        # cursor.callproc('check_if_user_exists', (user,))
        # result = cursor.stored_results()[0]
        # row = cursor.fetchone()
        a = 4
    except Exception as e:
        return -1
    return 'result'


user_exists(user)
