
from flask import json
from app import app, get_db_conn
from admin_report import getChapterDetails, get_users_and_cups, calcAverages, createCSVFile1


@app.route('/admin/get_users_statistics', methods=['POST'])
def a():
    # conn1 = mysql.connector.connect(**connDict)
    chapters_datails = getChapterDetails(get_db_conn())
    users_details = get_users_and_cups(get_db_conn())
    averages = calcAverages(users_details)

    return json.dumps({'users_details': get_users_and_cups(get_db_conn()),
                       'chapters_details': chapters_datails,
                       'averages': averages
                       }), 200


@app.route('/admin/user_statistics.csv', methods=['GET'])
def user_statistics_Excel():
    # conn1 = mysql.connector.connect(**connDict)
    chapters_datails = getChapterDetails(get_db_conn())
    users_details = get_users_and_cups(get_db_conn())
    averages = calcAverages(users_details)
    hebrewNames = ['שם משתמש', 'גיל', 'תאריך הרשמה', 'תאריך עדכון אחרון',
                   'שליטה עצמית', 'חיבור עצמי', 'מחוייבות להצלחה', 'מימוש עצמי', 'ממוצע משתמשים']

    headerRowExe = [
        hebrewNames[0], hebrewNames[1], hebrewNames[2], hebrewNames[3],
        *[i['chapter_name'] for i in chapters_datails],  hebrewNames[4],  hebrewNames[5],  hebrewNames[6],  hebrewNames[7]]

    averagesRowExe = [
        hebrewNames[8], averages['users_age_ave'], '', '',
        *averages['cupsByChapterAvg'], (averages['self_control_avg'])*100,
        (averages['self_connection_avg'])*100, (averages['self_commitment_avg']) *
        100, (averages['self_fulfillment_avg'])*100
    ]

    return createCSVFile1(headerRowExe, averagesRowExe, users_details)
