import mysql.connector
from flask import Blueprint, request, jsonify, json, Flask, make_response
import decimal
from staticData import connDict
from user import get_auth, get_user
# from app import get_db_conn
from cups_menage import getParamter
from app import app
# import render
# from user import login_required


cups_menage = Blueprint('cups_menage', __name__)

goals_or_hablits_chapter = 11

conn = mysql.connector.connect(**connDict)


# @cups_menage.route('/initioal_user_golas_or_habits', methods=['POST'])


@app.route('/get_user_cups', methods=['POST'])
def getUserCupsForAllChapters():
    user, localId = get_user(request.cookies.get('tokenId'))
    if not user:
        return 'Unauthorized user', 401

    sql = """
    select chapter.chapter_id, chapter_name, victory_cups_wined, max_victory_cups, automatic_win
    FROM chapter natural join user_cups
    where user_cups.user_name = %s;
    """
    cursor = get_conn().cursor()
    try:
        cursor.execute(sql, (localId,))
        rows = cursor.fetchall()
        data = []
        for row in rows:
            data.append(
                {'id': row[0], 'chapter_name': row[1], 'wined_cups': row[2], 'max_victory_cups': row[3], 'automatic_win': row[4]})
    except Exception as e:
        return str(e)
    response = jsonify({'rows': data})
    return response


@app.route('/get_goals_or_habits', methods=['POST'])
def get_goals_or_habits():
    sql = """
    select goals_selected, max_goals
    FROM goals_or_habits 
    where user_name = 'binyamin';
    """
    conn1 = mysql.connector.connect(**connDict)

    conn1._open_connection()
    mycursor = conn1.cursor()
    try:
        mycursor.execute(sql)
        rows = mycursor.fetchall()
        data = []
        for row in rows:
            data.append(
                # {'user_name': row[0], 'goal_selected': row[1], 'max_goals': row[2]})
                {'goalsSelected': row[0], 'maxGoals': row[1]})
    except Exception as e:
        return str(e)
    finally:
        conn1.close()
    return json.dumps({'val': data}), 200


@app.route('/get_user_control', methods=['POST'])
def getUserControl():
    result = getParamter('get_user_self_control', 'binyamin', 1000)
    return json.dumps({'val': str(result)}), 200


@cups_menage.route('/get_user_connection_to_yourself', methods=['POST'])
def getUserSelfConnection():
    result = getParamter('get_user_self_connection', 'binyamin', 1000)
    return json.dumps({'val': str(result)}), 200


@cups_menage.route('/get_user_commitment_to_success', methods=['POST'])
def getUserCommitment_to_success():
    result = getParamter('get_user_self_commitment', 'binyamin', 1000)
    return json.dumps({'val': str(result)}), 200


@cups_menage.route('/get_user_self_fulfillment', methods=['POST'])
def getUserSelfFulfillment():
    result = getParamter('get_user_self_fulfillment', 'binyamin', 1000)
    return json.dumps({'val': str(result)}), 200


############## get parameter until chapter user holds ##################

@cups_menage.route('/get_user_control_for_now', methods=['POST'])
def getUserControlForNow():
    result = getParamter('get_user_self_control', 'binyamin',
                         get_which_chapter_user_holds())
    return json.dumps({'val': str(result)}), 200


@cups_menage.route('/get_user_connection_to_yourself_for_now', methods=['POST'])
def getUserSelfConnectionForNow():
    result = getParamter('get_user_self_connection',
                         'binyamin',  get_which_chapter_user_holds())
    return json.dumps({'val': str(result)}), 200


@cups_menage.route('/get_user_commitment_to_success_for_now', methods=['POST'])
def getUserCommitment_to_successForNow():
    result = getParamter('get_user_self_commitment',
                         'binyamin',  get_which_chapter_user_holds())
    return json.dumps({'val': str(result)}), 200


@cups_menage.route('/get_user_self_fulfillment_for_now', methods=['POST'])
def getUserSelfFulfillmentForNow():
    result = getParamter('get_user_self_fulfillment',
                         'binyamin',  get_which_chapter_user_holds())
    return json.dumps({'val': str(result)}), 200


# def getParamter(parmterName, userName):
#     conn1 = mysql.connector.connect(
#         host="localhost",
#         user="jac",
#         password="1234",
#         database="my_db"
#     )
#     sql = """
#     SELECT sumOfUser/sumOfMax as your_control_result
#     FROM
#     (SELECT sum((victory_cups_wined/max_victory_cups)*distribution_of_points_for_max_victory_cups. %s ) as sumOfUser, sum(distribution_of_points_for_max_victory_cups.your_control) as sumOfMax
#     FROM chapter
#     left join user_cups_by_chapters on chapter.id = user_cups_by_chapters.chapter_id
#     left join distribution_of_points_for_max_victory_cups on chapter.id = distribution_of_points_for_max_victory_cups.chapter_id
#     WHERE user_cups_by_chapters.user_name = %s ) as baseTable
#     """ % (parmterName, "%s")
#     conn1._open_connection()
#     mycursor = conn1.cursor()
#     try:
#         mycursor.execute(sql, (userName, ))
#         val = mycursor.fetchone()[0]
#         conn1.commit()
#     except Exception as e:
#         return str(e)
#     finally:
#         conn1.close()
#     return json.dumps({'val': str(val)}), 200


@cups_menage.route('/update_user_goals', methods=['POST'])
def update_user_goals():
    user = 'binyamin'
    SP_paremeters_as_dict = request.get_json(force=True)
    update_goals_sql = """
    INSERT INTO goals_or_habits(user_name, goals_selected, max_goals)
    values(%s, %s, %s )
    ON DUPLICATE KEY UPDATE  goals_selected=%s, max_goals=%s
    """

    conn._open_connection()
    mycursor = conn.cursor()
    try:
        mycursor.execute(update_goals_sql, (user,
                                            SP_paremeters_as_dict['goals_selected'],
                                            SP_paremeters_as_dict['max_goals'],
                                            SP_paremeters_as_dict['goals_selected'],
                                            SP_paremeters_as_dict['max_goals']))
        if SP_paremeters_as_dict['goals_selected'] == 1:
            mycursor.callproc('update_user_cups_sql', (user,
                                                       SP_paremeters_as_dict['max_goals'],
                                                       SP_paremeters_as_dict['numOfGoalsAchived'],))
        conn.commit()
    except Exception as e:
        return str(e), 500
    else:
        return json.dumps({'rowCount': mycursor.rowcount}), 200
    finally:
        conn.close()


@cups_menage.route('/get_feadback', methods=['POST'])
def get_feadback():
    SP_paremeters_as_dict = request.get_json(force=True)
    return getFeedbackText(SP_paremeters_as_dict['parameterName'], 'binyamin')


@cups_menage.route('/update_user_cups', methods=['POST'])
def updateUserCups():
    user = 'binyamin'
    SP_paremeters_as_dict = request.get_json(force=True)
    SP_paremeters_as_dict['newCups'],
    SP_paremeters_as_dict['chapterId'],
    conn._open_connection()
    mycursor = conn.cursor()
    try:
        mycursor.callproc('update_user_cups', (user,
                                               SP_paremeters_as_dict['newCups'],
                                               SP_paremeters_as_dict['chapterId'],
                                               goals_or_hablits_chapter,))
        conn.commit()
        val = mycursor.fetchone()
    except Exception as e:
        return str(e), 500
    else:
        return json.dumps({'rowCount': mycursor.rowcount}), 200
    finally:
        conn.close()
