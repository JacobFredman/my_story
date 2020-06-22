from flask import Blueprint, request, jsonify, json
import mysql.connector
import itertools
from cups_menage import getParamter
from statistics import mean

admin_report = Blueprint('admin_report', __name__)


@admin_report.route('/admin/get_users_statistics', methods=['POST'])
def a():
    conn1 = mysql.connector.connect(
        host="localhost",
        user="jac",
        password="1234",
        database="my_db"
    )
    chapters_datails = getChapterDetails()
    users_details = get_users_and_cups(conn1)
    averages = calcAverages(users_details)

    return json.dumps({'users_details': get_users_and_cups(conn1),
                       'chapters_details': chapters_datails,
                       'averages': averages
                       }), 200


def calcAverages(users_details):
    self_control_avg = mean([i['self_control'] for i in users_details])
    self_connection_avg = mean([i['self_connection'] for i in users_details])
    self_commitment_avg = mean([i['self_commitment'] for i in users_details])
    self_fulfillment_avg = mean([i['self_fulfillment'] for i in users_details])
    users_age_ave = mean([i['age'] for i in users_details])

    allUsersCupsLists = [i['cups'] for i in users_details]
    allUsersCupsListsZiped = zip(*allUsersCupsLists)
    cupsByChapterAvg = [mean(i) for i in allUsersCupsListsZiped]
    return {'self_control_avg': self_control_avg,
            'self_connection_avg': self_connection_avg,
            'self_commitment_avg': self_commitment_avg,
            'self_fulfillment_avg': self_fulfillment_avg,
            'cupsByChapterAvg': cupsByChapterAvg,
            'users_age_ave': users_age_ave
            }


def getChapterDetails():
    sql = """
    select *
    FROM my_db.chapter ;
    """
    conn1 = mysql.connector.connect(
        host="localhost",
        user="jac",
        password="1234",
        database="my_db"
    )

    conn1._open_connection()
    mycursor = conn1.cursor()
    try:
        mycursor.execute(sql)
        rows = mycursor.fetchall()
        data = []
        for row in rows:
            data.append(
                {'chapter_id': row[0], 'chapter_name': row[1], 'max_victory_cups': row[2], 'automatic_win': row[3]})
    except Exception as e:
        print(e)
    finally:
        conn1.close()
    return data


def get_users_and_cups(conn):
    sql = """
    select user_name,  TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) as age, date_of_registering, date_update, victory_cups_wined, filled_feedback
    from `user` natural join user_cups
    order by user_name, chapter_id;
    """

    conn._open_connection()
    mycursor = conn.cursor()
    try:
        mycursor.execute(sql)
        rows = mycursor.fetchall()
        dbRows = []
        for row in rows:
            dbRows.append(row)
        # return json.dumps({'rows': dbRows})
        # user = row[0]
        # ClientRow = {'user_name': row[0], 'user_cups': []}
        # if row[0] not == user:
        #     ClientRow['user_cups'].append(row[6])
        # else:

        # data.append(
        #     {'user_name': row[0], 'date_of_birth': row[1], 'date_of_birth': row[2]})
    except Exception as e:
        print(e)
    finally:
        conn.close()

    clientRows = []
    def key(datum): return datum[0]
    for key, userGroup in itertools.groupby(dbRows, key=key):
        userGroup = list(userGroup)
        clientRows.append({
            'user_name': key,
            'age': userGroup[0][1],
            'date_of_registering': userGroup[0][2],
            'last_update': max([i[3] for i in userGroup]),
            'cups': [i[4] for i in userGroup],
            'filled_feedback': userGroup[0][5],
            'self_control': getParamter('get_user_self_control', key, 1000),
            'self_connection': getParamter('get_user_self_connection', key, 1000),
            'self_commitment':  getParamter('get_user_self_commitment', key, 1000),
            'self_fulfillment':  getParamter('get_user_self_fulfillment', key, 1000)
        })
    return clientRows


# def get_chapters_details(conn):
#     sql = """
#     SELECT `chapter`.`chapter_id`,
#     `chapter`.`chapter_name`,
#     `chapter`.`max_victory_cups`
#     FROM `my_db`.`chapter`;
#     """

#     conn._open_connection()
#     mycursor = conn.cursor()

#     mycursor.execute(sql)
#     rows = mycursor.fetchall()
#     data = []
#     for row in rows:
#         data.append(
#             {'user_name': row[0], 'date_of_birth': row[1], 'date_of_birth': row[2]})
#     except Exception as e:
#         return str(e)
#     finally:
#         conn.close()
#     return data, 200


# @cups_menage.route('/get_user_cups', methods=['POST'])
# def getUserCupsForAllChapters():
#     sql = """
#     select chapter.chapter_id, chapter_name, victory_cups_wined, max_victory_cups, automatic_win
#     FROM my_db.chapter natural join my_db.user_cups
#     where user_cups.user_name = 'binyamin';
#     """
#     conn1 = mysql.connector.connect(
#         host="localhost",
#         user="jac",
#         password="1234",
#         database="my_db"
#     )

#     conn1._open_connection()
#     mycursor = conn1.cursor()
#     try:
#         mycursor.execute(sql)
#         rows = mycursor.fetchall()
#         data = []
#         for row in rows:
#             data.append(
#                 {'id': row[0], 'chapter_name': row[1], 'wined_cups': row[2], 'max_victory_cups': row[3], 'automatic_win': row[4]})
#     except Exception as e:
#         return str(e)
#     finally:
#         conn1.close()
#     return json.dumps({'rows': data}), 200
