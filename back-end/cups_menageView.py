import mysql.connector
from flask import Blueprint, request, jsonify, json, Flask, make_response
import decimal
from staticData import connDict
from user import get_auth, get_user_firebase

# from app import get_db_conn
from cups_menage import getParamter
from cups_menage import get_which_chapter_user_holds, getFeedbackText
from initApp import get_db_conn, app

# import render
# from user import login_required


goals_or_hablits_chapter = 11

# conn = mysql.connector.connect(**connDict)


# @cups_menage.route('/initioal_user_golas_or_habits', methods=['POST'])


@app.route("/get_user_cups", methods=["POST"])
def getUserCupsForAllChapters1():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401

    sql = """
    select chapter.chapter_id, chapter_name, victory_cups_wined, max_victory_cups, automatic_win
    FROM chapter natural join user_cups
    where user_cups.user_name = %s;
    """
    cursor = get_db_conn().cursor()
    try:
        cursor.execute(sql, (localId,))
        rows = cursor.fetchall()
        data = []
        for row in rows:
            data.append(
                {
                    "id": row[0],
                    "chapter_name": row[1],
                    "wined_cups": row[2],
                    "max_victory_cups": row[3],
                    "automatic_win": row[4],
                }
            )
    except Exception as e:
        return str(e)
    response = jsonify({"rows": data})
    return response


@app.route("/get_goals_or_habits", methods=["POST"])
def get_goals_or_habits():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401

    sql = """
    select goals_selected, max_goals
    FROM goals_or_habits
    where user_name = %s;
    """
    # conn1 = mysql.connector.connect(**connDict)

    # conn1._open_connection()
    cursor = get_db_conn().cursor()
    try:
        cursor.execute(sql, (localId,))
        rows = cursor.fetchall()
        data = []
        for row in rows:
            data.append(
                # {'user_name': row[0], 'goal_selected': row[1], 'max_goals': row[2]})
                {"goalsSelected": row[0], "maxGoals": row[1]}
            )
    except Exception as e:
        return str(e)
    # finally:
    #     conn1.close()
    return json.dumps({"val": data}), 200


@app.route("/get_user_control", methods=["POST"])
def getUserControl():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    result = getParamter("get_user_self_control", localId, 1000)
    return json.dumps({"val": str(result)}), 200


@app.route("/get_user_connection_to_yourself", methods=["POST"])
def getUserSelfConnection():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    result = getParamter("get_user_self_connection", localId, 1000)
    return json.dumps({"val": str(result)}), 200


@app.route("/get_user_commitment_to_success", methods=["POST"])
def getUserCommitment_to_success():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    result = getParamter("get_user_self_commitment", localId, 1000)
    return json.dumps({"val": str(result)}), 200


@app.route("/get_user_self_fulfillment", methods=["POST"])
def getUserSelfFulfillment():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    result = getParamter("get_user_self_fulfillment", localId, 1000)
    return json.dumps({"val": str(result)}), 200


############## get parameter until chapter user holds ##################


@app.route("/get_user_control_for_now", methods=["POST"])
def getUserControlForNow():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    result = getParamter(
        "get_user_self_control", localId, get_which_chapter_user_holds()
    )
    return json.dumps({"val": str(result)}), 200


@app.route("/get_user_connection_to_yourself_for_now", methods=["POST"])
def getUserSelfConnectionForNow():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    result = getParamter(
        "get_user_self_connection", localId, get_which_chapter_user_holds()
    )
    return json.dumps({"val": str(result)}), 200


@app.route("/get_user_commitment_to_success_for_now", methods=["POST"])
def getUserCommitment_to_successForNow():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    result = getParamter(
        "get_user_self_commitment", localId, get_which_chapter_user_holds()
    )
    return json.dumps({"val": str(result)}), 200


@app.route("/get_user_self_fulfillment_for_now", methods=["POST"])
def getUserSelfFulfillmentForNow():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    result = getParamter(
        "get_user_self_fulfillment", localId, get_which_chapter_user_holds()
    )
    return json.dumps({"val": str(result)}), 200


@app.route("/update_user_goals", methods=["POST"])
def update_user_goals():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    # user = 'binyamin'
    SP_paremeters_as_dict = request.get_json(force=True)
    update_goals_sql = """
    INSERT INTO goals_or_habits(user_name, goals_selected, max_goals)
    values(%s, %s, %s )
    ON DUPLICATE KEY UPDATE  goals_selected=%s, max_goals=%s
    """

    # conn._open_connection()
    cursor = get_db_conn().cursor()
    try:
        cursor.execute(
            update_goals_sql,
            (
                localId,
                SP_paremeters_as_dict["goals_selected"],
                SP_paremeters_as_dict["max_goals"],
                SP_paremeters_as_dict["goals_selected"],
                SP_paremeters_as_dict["max_goals"],
            ),
        )
        if SP_paremeters_as_dict["goals_selected"] == 1:
            cursor.callproc(
                "update_user_cups_sql",
                (
                    localId,
                    SP_paremeters_as_dict["max_goals"],
                    SP_paremeters_as_dict["numOfGoalsAchived"],
                ),
            )
        get_db_conn().commit()
    except Exception as e:
        return str(e), 500
    else:
        return json.dumps({"rowCount": cursor.rowcount}), 200
    # finally:
    #     conn.close()


@app.route("/get_feadback", methods=["POST"])
def get_feadback():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    SP_paremeters_as_dict = request.get_json(force=True)
    return getFeedbackText(SP_paremeters_as_dict["parameterName"], localId)


@app.route("/update_user_cups", methods=["POST"])
def updateUserCups():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    # user = 'binyamin'
    SP_paremeters_as_dict = request.get_json(force=True)
    SP_paremeters_as_dict["newCups"],
    SP_paremeters_as_dict["chapterId"],
    # conn._open_connection()
    cursor = get_db_conn().cursor()
    try:
        cursor.callproc(
            "update_user_cups",
            (
                localId,
                SP_paremeters_as_dict["newCups"],
                SP_paremeters_as_dict["chapterId"],
                goals_or_hablits_chapter,
            ),
        )
        get_db_conn().commit()
        val = cursor.fetchone()
    except Exception as e:
        return str(e), 500
    else:
        return json.dumps({"rowCount": cursor.rowcount}), 200
    # finally:
    #     conn.close()
