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
    SP_paremeters_as_dict = request.get_json(force=True)
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
