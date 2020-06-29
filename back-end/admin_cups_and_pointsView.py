from flask import Blueprint, request, json
import mysql.connector
from staticData import connDict
from initApp import app

admin_cups_and_points = Blueprint('admin_cups_and_points', __name__)


@app.route('/admin/cups_and_points', methods=['POST'])
def getUserCupsForAllChapters():
    sql = " select * from chapter2 natural join points_max2;"
    conn = mysql.connector.connect(**connDict)

    conn._open_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        rows = cursor.fetchall()
        data = []
        for row in rows:
            data.append(
                {'id': row[0], 'chapter_name': row[1], 'max_victory_cups': row[2], 'automatic_win': row[3], 'your_control': row[4],
                 'connection_to_yourself': row[5], 'commitment_to_success': row[6], 'self_fulfillment': row[7]})
    except Exception as e:
        return str(e)
    finally:
        conn.close()
    return json.dumps({'rows': data}), 200


@app.route('/update_chapter_points_max', methods=['POST'])
def update_chapter_points_max():
    # return json.dumps({'rowCount': 'mycursor.rowcount'}), 200

    SP_paremeters_as_dict = request.get_json(force=True)
    autoWin = SP_paremeters_as_dict['automatic_win']
    if not (autoWin == '0' or autoWin == '1' or autoWin == 0 or autoWin == 1):
        return 'automatic_win must be 1 or 0', 500

    conn1 = mysql.connector.connect(**connDict)

    conn1._open_connection()
    mycursor = conn1.cursor()
    try:
        mycursor.callproc('update_points_max_and_chapter', (
            SP_paremeters_as_dict['id'],
            SP_paremeters_as_dict['your_control'],
            SP_paremeters_as_dict['connection_to_yourself'],
            SP_paremeters_as_dict['commitment_to_success'],
            SP_paremeters_as_dict['self_fulfillment'],
            SP_paremeters_as_dict['chapter_name'],
            SP_paremeters_as_dict['max_victory_cups'],
            SP_paremeters_as_dict['automatic_win'],
        ))
        # mycursor.execute(update_chapter_sql, (SP_paremeters_as_dict['chapter_name'],
        #                                       SP_paremeters_as_dict['max_victory_cups'],
        #                                       SP_paremeters_as_dict['automatic_win'],
        #                                       SP_paremeters_as_dict['id'],))
        conn1.commit()
    except Exception as e:
        print(str(e))
        return str(e), 500
    else:
        return json.dumps({'rowCount': mycursor.rowcount}), 200
    finally:
        conn1.close()
