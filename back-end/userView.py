
from app import app
from flask import request
from user import get_auth, add_new_user_in_local_db
from cups_menage import initial_user_cups


@app.route('/sign_up', methods=['POST'])
def signUp():
    request_paremeters_as_dict = request.get_json(force=True)
    email = request_paremeters_as_dict['email']
    password = request_paremeters_as_dict['password']
    user_first_name = request_paremeters_as_dict['user_first_name']
    user_last_name = request_paremeters_as_dict['user_last_name']
    try:
        # if the user allready exists in firebase its un error
        newUser = get_auth().create_user_with_email_and_password(email, password)
        # if user_exists(newUser['localId']):
        #     return 'user_allready_exists', 203
        add_new_user_in_local_db(
            newUser['localId'], user_first_name, user_last_name, conn)
        initial_user_cups(newUser['localId'])
    except Exception as e:
        print(e)
        return 'user not created seccessfuly', 500
    finally:
        conn.close()
    return 'user created seccessfuly', 200
