from initApp import get_db_conn, app
from flask import Blueprint, request, jsonify, json, Flask, make_response
from user import get_auth, get_user_firebase

goals_or_hablits_chapter = 11


@app.route("/check", methods=["POST"])
def check():
    return "hi!!"


@app.route("/boot_api/update_chapter_read_status", methods=["POST"])
def bootApiupdateChapterReadStatus():
    SP_paremeters_as_dict = request.get_json(force=True)
    try:
        user, localId = get_user_firebase(SP_paremeters_as_dict["tokenId"])
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    cursor = get_db_conn().cursor()

    if SP_paremeters_as_dict["is_readed"]:
        spName = "make_chapter_readed"
    else:
        spName = "make_chapter_unreaded"

    try:
        cursor.callproc(
            spName, (localId, SP_paremeters_as_dict["chapterId"],),
        )
        get_db_conn().commit()
        val = cursor.fetchone()
    except Exception as e:
        print(str(e))
        return "error", 500
    else:
        return json.dumps({"rowCount": cursor.rowcount}), 200


@app.route("/boot_api/update_user_cups", methods=["POST"])
def bootApiupdateUserCups():
    SP_paremeters_as_dict = request.get_json(force=True)
    try:
        user, localId = get_user_firebase(SP_paremeters_as_dict["tokenId"])
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    SP_paremeters_as_dict["newCups"],
    SP_paremeters_as_dict["chapterId"],
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


@app.route("/boot_api/update_user_goals", methods=["POST"])
def bootApi_update_user_goals():
    SP_paremeters_as_dict = request.get_json(force=True)
    try:
        user, localId = get_user_firebase(SP_paremeters_as_dict["tokenId"])
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    # user = 'binyamin'
    update_goals_sql = """
    INSERT INTO goals_or_habits(user_name, goals_selected, max_goals)
    values(%s, %s, %s )
    ON DUPLICATE KEY UPDATE  goals_selected=%s, max_goals=%s
    """
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

