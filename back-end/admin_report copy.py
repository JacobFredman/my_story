# from flask import Blueprint, request, jsonify, json
# import mysql.connector
# import itertools

# admin_report = Blueprint('admin_report', __name__)


# @admin_report.route('/get_admin_report', methods=['POST'])
# def a():
#     conn1 = mysql.connector.connect(
#         host="localhost",
#         user="jac",
#         password="1234",
#         database="my_db"
#     )
#     return json.dumps({'rows': get_users_and_cups(conn1)})


# def get_users_and_cups(conn):
#     sql = """
#     select user_name,  TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) as age, date_of_registering, date_update, victory_cups_wined, chapter_id
#     from `user` natural join user_cups
#     order by user_name, chapter_id;
#     """

#     conn._open_connection()
#     mycursor = conn.cursor()
#     try:
#         mycursor.execute(sql)
#         rows = mycursor.fetchall()
#         dbRows = []
#         for row in rows:
#             dbRows.append(row)
#         # return json.dumps({'rows': dbRows})
#         # user = row[0]
#         # ClientRow = {'user_name': row[0], 'user_cups': []}
#         # if row[0] not == user:
#         #     ClientRow['user_cups'].append(row[6])
#         # else:

#         # data.append(
#         #     {'user_name': row[0], 'date_of_birth': row[1], 'date_of_birth': row[2]})
#     except Exception as e:
#         print(e)
#     finally:
#         conn.close()

#     def key(datum): return datum[0]
#     ClientRows = [{'user_name': key,
#                    #    'age': group[0][1],
#                    #    'date_of_registering': group[0][2],
#                    'last_update_date': max([item[3] for item in group]),
#                    'cups': (item for item in group)
#                    }
#                   for key, group in itertools.groupby(dbRows, key=key)]
#     return ClientRows, 200


# # def get_chapters_details(conn):
# #     sql = """
# #     SELECT `chapter`.`chapter_id`,
# #     `chapter`.`chapter_name`,
# #     `chapter`.`max_victory_cups`
# #     FROM `my_db`.`chapter`;
# #     """

# #     conn._open_connection()
# #     mycursor = conn.cursor()

# #     mycursor.execute(sql)
# #     rows = mycursor.fetchall()
# #     data = []
# #     for row in rows:
# #         data.append(
# #             {'user_name': row[0], 'date_of_birth': row[1], 'date_of_birth': row[2]})
# #     except Exception as e:
# #         return str(e)
# #     finally:
# #         conn.close()
# #     return data, 200


# # @cups_menage.route('/get_user_cups', methods=['POST'])
# # def getUserCupsForAllChapters():
# #     sql = """
# #     select chapter.chapter_id, chapter_name, victory_cups_wined, max_victory_cups, automatic_win
# #     FROM my_db.chapter natural join my_db.user_cups
# #     where user_cups.user_name = 'binyamin';
# #     """
# #     conn1 = mysql.connector.connect(
# #         host="localhost",
# #         user="jac",
# #         password="1234",
# #         database="my_db"
# #     )

# #     conn1._open_connection()
# #     mycursor = conn1.cursor()
# #     try:
# #         mycursor.execute(sql)
# #         rows = mycursor.fetchall()
# #         data = []
# #         for row in rows:
# #             data.append(
# #                 {'id': row[0], 'chapter_name': row[1], 'wined_cups': row[2], 'max_victory_cups': row[3], 'automatic_win': row[4]})
# #     except Exception as e:
# #         return str(e)
# #     finally:
# #         conn1.close()
# #     return json.dumps({'rows': data}), 200
