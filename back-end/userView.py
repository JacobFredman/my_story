from initApp import app, get_db_conn
from flask import request, json
from user import (
    get_auth,
    add_new_user_in_local_db,
    user_exists,
    isUserAdmin,
    get_user_firebase,
    delete_user,
    initial_user_golas_or_habits
)
from cups_menage import initial_user_cups


@app.route("/api/sign_up", methods=["POST"])
def signUp():
    request_paremeters_as_dict = request.get_json(force=True)
    email = request_paremeters_as_dict["email"]
    password = request_paremeters_as_dict["password"]
    user_first_name = request_paremeters_as_dict["user_first_name"]
    user_last_name = request_paremeters_as_dict["user_last_name"]
    try:
        # if the user allready exists in firebase its un error
        newUser = get_auth().create_user_with_email_and_password(email, password)
        # if user_exists(newUser['localId']):
        #     return 'user_allready_exists', 203
        add_new_user_in_local_db(
            newUser["localId"], user_first_name.encode('UTF-8'), user_last_name, None, email
        )
        initial_user_cups(newUser["localId"])
        initial_user_golas_or_habits(newUser["localId"])
    except Exception as e:
        print(e)
        return "user not created seccessfuly", 500
    # finally:
    #     conn.close()
    return "user created seccessfuly", 200


@app.route("/api/sign_in", methods=["POST"])
def signIn():
    tokenId = request.get_json(force=True)["tokenId"]
    try:
        user = get_auth().get_account_info(tokenId)["users"][0]
    except Exception as e:
        print(e)
        return "error", 400
    try:
        localId = user["localId"]
        if not user_exists(localId):
            add_new_user_in_local_db(localId, None, None, user["displayName"], user["email"])
            initial_user_cups(localId)
        isAdmin = isUserAdmin(localId)
    except Exception as e:
        print(e)
        return "error", 500
    # objectToReturn = getUserData() 
    # return objectToReturn, 200
    return json.dumps({"is_admin": isAdmin, "email": 'notExist'}), 200


@app.route("/api/get_user_data", methods=["POST"])
def get_user_data():
    tokenId = request.get_json(force=True)["tokenId"]
    user = get_auth().get_account_info(tokenId)["users"][0]
    localId = user["localId"]
    isAdmin = isUserAdmin(localId)
    return json.dumps({"is_admin": isAdmin, "email": user["email"]}), 200


@app.route("/api/is_authed_user", methods=["POST"])
def is_authed_user():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    return localId, 200


@app.route("/api/delete_user_from_local_db", methods=["POST"])
def delete_user_view():
    try:
        user, localId = get_user_firebase(request.cookies.get("tokenId"))
        if not user:
            return "Unauthorized user", 401
    except:
        return "Unauthorized user", 401
    try:
        delete_user(localId)
    except:
        return 'user not deleted seccefuly', 500
    return 'user deleted', 200
