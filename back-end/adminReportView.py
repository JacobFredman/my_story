from flask import json, request
from initApp import app, get_db_conn
from admin_report import (
    getChapterDetails,
    get_users_and_cups,
    calcAverages,
    createCSVFile1,
)
from user import is_user_admin


@app.route("/api/admin/get_users_statistics", methods=["POST"])
def a():
    try:
        if not is_user_admin(request.cookies.get("tokenId")):
            return "not admin user", 401
    except Exception as e:
        print(e)
        return "not admin user", 401
    # conn1 = mysql.connector.connect(**connDict)
    chapters_datails = getChapterDetails(get_db_conn())
    users_details = get_users_and_cups(get_db_conn())
    averages = calcAverages(users_details)

    return (
        json.dumps(
            {
                "users_details": get_users_and_cups(get_db_conn()),
                "chapters_details": chapters_datails,
                "averages": averages,
            }
        ),
        200,
    )


@app.route("/api/admin/user_statistics.csv", methods=["GET"])
def user_statistics_Excel():
    try:
        if not is_user_admin(request.cookies.get("tokenId")):
            return "not admin user", 401
    except:
        return "not admin user", 401
    # conn1 = mysql.connector.connect(**connDict)
    chapters_datails = getChapterDetails(get_db_conn())
    users_details = get_users_and_cups(get_db_conn())
    averages = calcAverages(users_details)
    hebrewNames = [
        "שם משתמש",
        "גיל",
        "תאריך הרשמה",
        "תאריך עדכון אחרון",
        "שליטה עצמית",
        "חיבור עצמי",
        "מחוייבות להצלחה",
        "מימוש עצמי",
        "ממוצע משתמשים",
    ]

    headerRowExe = [
        hebrewNames[0],
        hebrewNames[1],
        hebrewNames[2],
        hebrewNames[3],
        *[i["chapter_name"] for i in chapters_datails],
        hebrewNames[4],
        hebrewNames[5],
        hebrewNames[6],
        hebrewNames[7],
    ]

    averagesRowExe = [
        hebrewNames[8],
        averages["users_age_ave"],
        "",
        "",
        *averages["cupsByChapterAvg"],
        (averages["self_control_avg"]) * 100,
        (averages["self_connection_avg"]) * 100,
        (averages["self_commitment_avg"]) * 100,
        (averages["self_fulfillment_avg"]) * 100,
    ]

    return createCSVFile1(headerRowExe, averagesRowExe, users_details)
