from flask import request, jsonify, json, send_file
import mysql.connector
import itertools
from cups_menage import getParamter
from statistics import mean
from staticData import connDict
import csv
from initApp import get_db_conn


def calcAverages(users_details):
    self_control_avg = mean(
        [i["self_control"] for i in users_details if i["self_control"] is not None]
    )
    self_connection_avg = mean(
        [
            i["self_connection"]
            for i in users_details
            if i["self_connection"] is not None
        ]
    )
    self_commitment_avg = mean(
        [
            i["self_commitment"]
            for i in users_details
            if i["self_commitment"] is not None
        ]
    )
    self_fulfillment_avg = mean(
        [
            i["self_fulfillment"]
            for i in users_details
            if i["self_fulfillment"] is not None
        ]
    )
    users_age_ave = mean([i["age"] for i in users_details if i["age"] is not None])

    allUsersCupsLists = [i["cups"] for i in users_details]
    allUsersCupsListsZiped = zip(*allUsersCupsLists)
    cupsByChapterAvg = [mean(i) for i in allUsersCupsListsZiped]
    return {
        "self_control_avg": self_control_avg,
        "self_connection_avg": self_connection_avg,
        "self_commitment_avg": self_commitment_avg,
        "self_fulfillment_avg": self_fulfillment_avg,
        "cupsByChapterAvg": cupsByChapterAvg,
        "users_age_ave": users_age_ave,
    }


def getChapterDetails(conn):
    sql = """
    select *
    FROM chapter ;
    """
    # conn1 = mysql.connector.connect(**connDict)

    # conn._open_connection()
    cursor = get_db_conn().cursor()
    data = []
    try:
        cursor.execute(sql)
        rows = cursor.fetchall()
        for row in rows:
            data.append(
                {
                    "chapter_id": row[0],
                    "chapter_name": row[1],
                    "max_victory_cups": row[2],
                    "automatic_win": row[3],
                }
            )
    except Exception as e:
        print(e)
    # finally:
    #     conn.close()
    return data


def get_users_and_cups(conn):
    sql = """
    select user_name,  TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) as age, date_of_registering, date_update, victory_cups_wined, filled_feedback
    from `user` natural join user_cups
    order by user_name, chapter_id;
    """

    # conn._open_connection()
    cursor = get_db_conn().cursor()
    try:
        cursor.execute(sql)
        rows = cursor.fetchall()
        dbRows = []
        for row in rows:
            dbRows.append(row)
        # return json.dumps({'rows': dbRows})
        # user = row[0]
        # ClientRow = {'user_name': row[0], 'user_cups': []}
        # if row[0] not == user:
        #     ClientRow['user_cups'].append(row[6])
        # else:

        # data.append(
        #     {'user_name': row[0], 'date_of_birth': row[1], 'date_of_birth': row[2]})
    except Exception as e:
        print(e)
    # finally:
    #     conn.close()

    clientRows = []

    def key(datum):
        return datum[0]

    for key, userGroup in itertools.groupby(dbRows, key=key):
        userGroup = list(userGroup)
        clientRows.append(
            {
                "user_name": key,
                "age": userGroup[0][1],
                "date_of_registering": userGroup[0][2],
                "last_update": max([i[3] for i in userGroup]),
                "cups": [i[4] for i in userGroup],
                "filled_feedback": userGroup[0][5],
                "self_control": getParamter("get_user_self_control", key, 1000),
                "self_connection": getParamter("get_user_self_connection", key, 1000),
                "self_commitment": getParamter("get_user_self_commitment", key, 1000),
                "self_fulfillment": getParamter("get_user_self_fulfillment", key, 1000),
            }
        )
    return clientRows


def createCSVFile1(fieldNames, averagesRowExe, users_details):
    # generateQuery()
    # milliseconds = int(round(time.time() * 1000))
    # strNow = datetime.datetime.now().strftime("%d-%m-%Y--%H_%M_%S")
    fileName = "C:/temp/report.csv"
    with open(fileName, mode="w", newline="") as csv_file:
        # writer = csv.DictWriter(csv_file, fieldnames=fieldNames)
        # writer.writeheader()
        # writer.writerow(averagesRowExe)
        writer = csv.writer(csv_file, quoting=csv.QUOTE_ALL)
        writer.writerow(fieldNames)
        writer.writerow(averagesRowExe)
        for user in users_details:
            rowForWrite = [
                user["user_name"],
                user["age"],
                user["date_of_registering"],
                user["last_update"],
                *user["cups"],
                (user["self_control"]) * 100,
                (user["self_connection"]) * 100,
                (user["self_commitment"]) * 100,
                (user["self_fulfillment"]) * 100,
            ]
            writer.writerow(rowForWrite)
    a = send_file(fileName)
    return a
