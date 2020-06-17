from my_dbConnection import conn
import mysql.connector
from flask import Blueprint, request, jsonify, json
import decimal
import yaml

cups_menage = Blueprint('cups_menage', __name__)


@cups_menage.route('/initioal_user_cups', methods=['POST'])
def initial_user_cups():
    conn._open_connection()
    mycursor = conn.cursor()
    insertAutoWinStatment = """ INSERT INTO my_db.user_cups_by_chapters
    SELECT 'binyamin' , curdate(), id, max_victory_cups
    FROM my_db.chapter
    WHERE automatic_win = 1;
    """
    insertZeroStatments = """INSERT INTO my_db.user_cups_by_chapters
    SELECT 'binyamin', curdate(), id, 0
    FROM my_db.chapter
    WHERE automatic_win = 0;
    """
    try:
        mycursor.execute(insertAutoWinStatment)
        mycursor.execute(insertZeroStatments)
        conn.commit()
    except Exception as e:
        return str(e)
    finally:
        conn.close()
    return 'ok'


@cups_menage.route('/get_user_cups', methods=['POST'])
def getUserCupsForAllChapters():
    sql = """
    select chapter.id, chapter_name, victory_cups_wined, max_victory_cups, automatic_win
    FROM my_db.chapter left join my_db.user_cups_by_chapters on chapter.id = user_cups_by_chapters.chapter_id
    where user_cups_by_chapters.user_name = 'binyamin';
    """
    conn._open_connection()
    mycursor = conn.cursor()
    try:
        mycursor.execute(sql)
        rows = mycursor.fetchall()
        data = []
        for row in rows:
            data.append(
                {'id': row[0], 'chapter_name': row[1], 'wined_cups': row[2], 'max_victory_cups': row[3], 'automatic_win': row[4]})
        # for x in myresult:
        #     print(x)
    except Exception as e:
        return str(e)
    finally:
        conn.close()
    return json.dumps({'rows': data}), 200


@cups_menage.route('/get_user_control', methods=['POST'])
def getUserControl():
    result = getParamter('get_user_self_control', 'binyamin', 1000)
    return json.dumps({'val': str(result)}), 200


@cups_menage.route('/get_user_control_for_now', methods=['POST'])
def getUserControlForNow():
    return getParamter('get_user_self_control', 'binyamin', get_which_chapter_user_holds())


@cups_menage.route('/get_user_connection_to_yourself', methods=['POST'])
def getUserSelfConnection():
    result = getParamter('get_user_connection_to_yourself', 'binyamin', 1000)
    return json.dumps({'val': str(result)}), 200


@cups_menage.route('/get_user_commitment_to_success', methods=['POST'])
def getUserCommitment_to_success():
    result = getParamter('get_user_commitment_to_success', 'binyamin', 1000)
    return json.dumps({'val': str(result)}), 200


@cups_menage.route('/get_user_self_fulfillment', methods=['POST'])
def getUserSelfFulfillment():
    result = getParamter('get_user_self_fulfillment', 'binyamin', 1000)
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

def getParamter(SP_name, userName, chapterUserHolds):
    conn1 = mysql.connector.connect(
        host="localhost",
        user="jac",
        password="1234",
        database="my_db"
    )
    conn1._open_connection()
    mycursor = conn1.cursor()
    resultArray = []
    try:
        mycursor.callproc(SP_name, (userName, chapterUserHolds))
        for result in mycursor.stored_results():
            abc = result.fetchall()
            print(abc[0][0])
            resultArray.append(float(str(abc[0][0])))
    except Exception as e:
        return str(e)
    finally:
        conn1.close()
    # return json.dumps({'val': str(resultArray[1])}), 200
    return resultArray[1]


@cups_menage.route('/get_feadback', methods=['POST'])
def get_feadback():
    SP_paremeters_as_dict = request.get_json(force=True)
    return getFeedbackText(SP_paremeters_as_dict['parameterName'], 'binyamin')


def getFeedbackText(parameterName, userName):
    parameterName_SpNameDict = {
        "your_control": "get_user_self_control",
        "connection_to_yourself": "get_user_connection_to_yourself",
        "commitment_to_success": "get_user_commitment_to_success",
        "self_fulfillment": "get_user_self_fulfillment"}
    percentOfSeccess = getParamter(
        parameterName_SpNameDict['your_control'], 'binyamin', 1000)
    percentOfSeccess = percentOfSeccess * 100

    conn1 = mysql.connector.connect(
        host="localhost",
        user="jac",
        password="1234",
        database="my_db"
    )
    conn1._open_connection()
    cursor = conn1.cursor()
    sql = ''
    if percentOfSeccess <= 40:
        sql = 'select %s from feedbacktext where under_or_equal_seccess_percent = 40' % (
            parameterName,)
    elif percentOfSeccess <= 60:
        sql = 'select %s from feedbacktext where under_or_equal_seccess_percent = 60' % (
            parameterName,)
    elif percentOfSeccess <= 80:
        sql = 'select %s from feedbacktext where under_or_equal_seccess_percent = 80' % (
            parameterName,)
    else:
        sql = 'select %s from feedbacktext where under_or_equal_seccess_percent = 100' % (
            parameterName,)
    try:
        cursor.execute(sql)
        textResult = cursor.fetchone()
    except Exception as e:
        print(str(e))
        return 'error', 500
    finally:
        conn.close()
        return json.dumps({'val': textResult}), 200


@cups_menage.route('/update_user_cups', methods=['POST'])
def updateUserCups():
    user = 'binyamin'
    SP_paremeters_as_dict = request.get_json(force=True)
    SP_paremeters_as_dict['newCups'],
    SP_paremeters_as_dict['chapterId'],
    sql = """
    UPDATE my_db.user_cups_by_chapters
    SET date_update = CURDATE(), victory_cups_wined = %s
    WHERE user_name = %s and chapter_id = %s
    and exists (select * from chapter where id = %s and max_victory_cups >= %s and automatic_win = 0 )
    """
    conn._open_connection()
    mycursor = conn.cursor()
    try:
        mycursor.execute(sql, (SP_paremeters_as_dict['newCups'],
                               user, SP_paremeters_as_dict['chapterId'], SP_paremeters_as_dict['chapterId'],
                               SP_paremeters_as_dict['newCups']))
        val = mycursor.fetchone()
    except Exception as e:
        return str(e), 500
    else:
        return json.dumps({'rowCount': mycursor.rowcount}), 200
    finally:
        conn.close()


def get_which_chapter_user_holds():
    conn1 = mysql.connector.connect(
        host="localhost",
        user="jac",
        password="1234",
        database="my_db"
    )
    conn1._open_connection()
    cursor = conn1.cursor()
    sql = """
    select chapter.id as id, user_cups_by_chapters.victory_cups_wined as userCups, chapter.automatic_win 
    from chapter 
    left join `user_cups_by_chapters` on chapter.id = user_cups_by_chapters.chapter_id
    where user_name = 'binyamin'
    """
    try:
        cursor.execute(sql)
        resultArray = cursor.fetchall()
    except Exception as e:
        print(str(e))
        return 'error', 500
    finally:
        conn.close()
    return 'result'


# def getParamterRelativeToUserChapter(parmterName, userName):
#     conn1 = mysql.connector.connect(
#         host="localhost",
#         user="jac",
#         password="1234",
#         database="my_db"
#     )
#     conn1._open_connection()
#     mycursor = conn1.cursor()
#     parameter1 = 0.2
#     userName = 'binyamin'
#     try:
#         mycursor.callproc('get_relative_self_control', (userName, parameter1))
#         resultArray = []
#         for result in mycursor.stored_results():
#             abc = result.fetchall()
#             print(abc[0][0])
#             resultArray.append(abc[0][0])
#     except Exception as e:
#         return str(e), 500
#     finally:
#         conn1.close()
#     return json.dumps({'val': str(resultArray[1])}), 200
