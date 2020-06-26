from flask import Blueprint, request, json
import mysql.connector
from staticData import connDict


admin_feedback_texts = Blueprint('admin_feedback_texts', __name__)


@admin_feedback_texts.route('/admin/feedback_texts', methods=['POST'])
def get_feedback_texts():
    sql = " select * from feedbacktext;"
    conn = mysql.connector.connect(**connDict)

    conn._open_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        rows = cursor.fetchall()
        data = []
        for row in rows:
            data.append(
                {'under_or_equal_seccess_percent': row[0], 'your_control': row[1], 'connection_to_yourself': row[2], 'commitment_to_success': row[3], 'self_fulfillment': row[4],
                 })
    except Exception as e:
        return str(e)
    finally:
        conn.close()
    return json.dumps({'rows': data}), 200


@admin_feedback_texts.route('/update_feedback_texts', methods=['POST'])
def update_feedback_texts():
    # return json.dumps({'rowCount': 'mycursor.rowcount'}), 200

    SP_paremeters_as_dict = request.get_json(force=True)

    sql = """
    UPDATE feedbacktext
    SET
    `your_control` = %s,
    `connection_to_yourself` = %s,
    `commitment_to_success` = %s,
    `self_fulfillment` = %s
    WHERE `under_or_equal_seccess_percent` = %s;
    """
    conn1 = mysql.connector.connect(**connDict)

    conn1._open_connection()
    mycursor = conn1.cursor()
    try:
        mycursor.execute(sql, (
            SP_paremeters_as_dict['your_control'],
            SP_paremeters_as_dict['connection_to_yourself'],
            SP_paremeters_as_dict['commitment_to_success'],
            SP_paremeters_as_dict['self_fulfillment'],
            SP_paremeters_as_dict['under_or_equal_seccess_percent'],
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
