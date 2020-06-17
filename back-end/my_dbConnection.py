import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="jac",
    password="1234",
    database="my_db"
)

# mycursor = mydb.cursor()

# mycursor.execute("SELECT * FROM user")

# myresult = mycursor.fetchall()

# for x in myresult:
#     print(x)

# mydb.close()

# sql2 = 'INSERT INTO my_db.user (user_name, password) VALUES ("ccc", "102030") '
# # sql1 = """INSERT INTO my_db.user_cups_by_chapters
# #     SELECT 'binyamin' , curdate(), id, max_victory_cups
# #     FROM my_db.chapter
# #     WHERE automatic_win = 1;
# #     """
# sql = """ INSERT INTO my_db.user_cups_by_chapters
#      SELECT 'binyamin', curdate(), id, 0
#      FROM my_db.chapter
#      WHERE automatic_win = 0;
#      """
# mycursor.execute(sql)
# mydb.commit()
