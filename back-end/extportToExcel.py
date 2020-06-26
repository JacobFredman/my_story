
from flask import Blueprint, request, jsonify, json, send_file
import datetime
import csv
from admin_report import getChapterDetails, get_users_and_cups, calcAverages
import mysql.connector
from staticData import connDict


extportToExcel = Blueprint('extportToExcel', __name__)


# def createCSVFile(fieldNames,  rows):
#     generateQuery()
#     # milliseconds = int(round(time.time() * 1000))
#     strNow = datetime.datetime.now().strftime("%d-%m-%Y--%H_%M_%S")
#     fileName = 'ReportsFiles/demand' + strNow + '.csv'
#     with open(fileName, mode='w', newline='') as csv_file:
#         writer = csv.DictWriter(csv_file, fieldnames=fieldNames)
#         writer.writeheader()
#         for row in rows:
#             rowForWrite = {}
#             for i in range(len(fieldNames)):
#                 rowForWrite[fieldNames[i]] = pythonValuesToFileValues(row[i])
#             writer.writerow(rowForWrite)
#     return send_file(fileName)


@extportToExcel.route('/admin/user_statistics.csv', methods=['GET'])
def user_statistics_Excel():
    conn1 = mysql.connector.connect(**connDict)
    chapters_datails = getChapterDetails(conn1)
    users_details = get_users_and_cups(conn1)
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


def createCSVFile1(fieldNames, averagesRowExe,  users_details):
    # generateQuery()
    # milliseconds = int(round(time.time() * 1000))
    # strNow = datetime.datetime.now().strftime("%d-%m-%Y--%H_%M_%S")
    # fileName = 'C:/temp/report.csv'
    fileName = 'http://story.mmb.org.il/client111/excelFiles/admin_report.csv'
    with open(fileName, mode='w', newline='') as csv_file:
        # writer = csv.DictWriter(csv_file, fieldnames=fieldNames)
        # writer.writeheader()
        # writer.writerow(averagesRowExe)
        writer = csv.writer(csv_file,  quoting=csv.QUOTE_ALL)
        writer.writerow(fieldNames)
        writer.writerow(averagesRowExe)
        for user in users_details:
            rowForWrite = [
                user['user_name'], user['age'], user['date_of_registering'], user['last_update'],
                *user['cups'],
                (user['self_control'])*100, (user['self_connection']) * 100,
                (user['self_commitment']) * 100, (user['self_fulfillment'])*100
            ]
            writer.writerow(rowForWrite)
    a = send_file(fileName)
    return a
