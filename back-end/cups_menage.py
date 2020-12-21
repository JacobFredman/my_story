from initApp import get_db_conn
from flask import json


def getParamter(SP_name, userName, chapterUserHolds):
    cursor = get_db_conn().cursor()
    resultArray = []
    try:
        cursor.callproc(SP_name, (userName, chapterUserHolds))
        for result in cursor.stored_results():
            abc = result.fetchall()
            print(abc[0][0])
            if abc[0][0] is None:
                resultArray.append(0)
            else:
                resultArray.append(float(str(abc[0][0])))
    except Exception as e:
        return str(e)
    # finally:
    #     conn1.close()
    # return json.dumps({'val': str(resultArray[1])}), 200
    return resultArray[0]


def getFeedbackText(parameterName, userName):
    parameterName_SpNameDict = {
        "your_control": "get_user_self_control",
        "connection_to_yourself": "get_user_self_connection",
        "commitment_to_success": "get_user_self_commitment",
        "self_fulfillment": "get_user_self_fulfillment",
    }
    percentOfSeccess = getParamter(
        # parameterName_SpNameDict['your_control'], 'binyamin', 1000)
        parameterName_SpNameDict[parameterName],
        userName,
        1000,
    )
    # if percentOfSeccess is None:
    # percentOfSeccess = 0
    percentOfSeccess = percentOfSeccess * 100

    cursor = get_db_conn().cursor()
    secondaryHeadersql = (
        "select %s from feedbacktext where under_or_equal_seccess_percent = -2"
        % (parameterName,)
    )

    sql = ""
    if float(percentOfSeccess) <= 49.99:
        sql = (
            "select %s from feedbacktext where under_or_equal_seccess_percent = 49.99"
            % (parameterName,)
        )
    elif float(percentOfSeccess) <= 69.99:
        sql = (
            "select %s from feedbacktext where under_or_equal_seccess_percent = 69.99"
            % (parameterName,)
        )
    elif float(percentOfSeccess) <= 100:
        sql = (
            "select %s from feedbacktext where under_or_equal_seccess_percent = 100"
            % (parameterName,)
        )

    try:
        # cursor.execute(
        #     'select your_control from feedbacktext where under_or_equal_seccess_percent = 40')
        cursor.execute(sql)
        textResult = cursor.fetchone()
        cursor.execute(secondaryHeadersql)
        secondaryHeaderResult = cursor.fetchone()
    except Exception as e:
        print(str(e))
        return "error", 500
    # finally:
    #     conn.close()
    return (
        json.dumps({"val": textResult, "secondaryHeader": secondaryHeaderResult}),
        200,
    )


def get_which_chapter_user_holds():
    # conn1 = mysql.connector.connect(**connDict)
    # conn1._open_connection()
    # sql = """
    # select chapter.id as id, user_cups_by_chapters.victory_cups_wined as userCups, chapter.automatic_win
    # from chapter
    # left join `user_cups_by_chapters` on chapter.id = user_cups_by_chapters.chapter_id
    # where user_name = 'binyamin'
    # """
    sql = """
    select chapter.chapter_id as id, user_cups.victory_cups_wined as userCups, chapter.automatic_win 
    from chapter natural join `user_cups`
    where user_name = 'binyamin'
    """
    cursor = get_db_conn().cursor()
    try:
        cursor.execute(sql)
        resultArray = cursor.fetchall()
    except Exception as e:
        print(str(e))
        return "error", 500
    # finally:
    #     conn.close()
    lastChapter = 0
    for x in resultArray:
        # if x has cups and x is not automatic then get it
        if x[1] > 0 and x[2] == 0:
            lastChapter = x[0]
        # if x is immdietly after a chain of x's
        elif x[1] > 0 and lastChapter == (x[0] - 1):
            lastChapter = x[0]
    print(lastChapter)
    return str(lastChapter)


def initial_user_cups(user):
    # conn._open_connection()
    cursor = get_db_conn().cursor()
    insertAutoWinStatment = """ INSERT INTO user_cups
    SELECT %s , curdate(), chapter_id, max_victory_cups, 0
    FROM chapter
    WHERE automatic_win = 1;
    """
    insertZeroStatments = """INSERT INTO user_cups
    SELECT %s , curdate(), chapter_id, 0, 0
    FROM chapter
    WHERE automatic_win = 0;
    """
    try:
        cursor.execute(insertAutoWinStatment, (user,))
        cursor.execute(insertZeroStatments, (user,))
        get_db_conn().commit()
    except Exception as e:
        return str(e)
    # finally:
    #     conn.close()
    return "ok"
