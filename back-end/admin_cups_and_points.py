from flask import Blueprint, request, json
import mysql.connector


admin_cups_and_points = Blueprint('admin_cups_and_points', __name__)


@admin_cups_and_points.route('/admin/cups_and_points', methods=['POST'])
def getUserCupsForAllChapters():
    sql = " select * from chapter natural join points_max;"
    conn = mysql.connector.connect(
        host="localhost",
        user="jac",
        password="1234",
        database="my_db"
    )

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
