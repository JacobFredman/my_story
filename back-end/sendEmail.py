import smtplib
from email.mime.text import MIMEText


def getEmailSettings():
    conn = mysql.connector.connect(**connDict)
    mycursor = conn.cursor()
    mycursor.execute("SELECT * FROM setting")
    settings = mycursor.fetchall()

    for row in settings:
        if row[0] == 'email_sender_password':
            password = row[2]
        if row[0] == 'email_sender':
            emailSenderAddress = row[2]
        if row[0] == 'reciver_email_address':
            emailReceiverAddress = row[2]
    return password, emailSenderAddress, emailReceiverAddress


def sendEmail(senderName, massage, emailtopic):
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(getEmailSettings[1], getEmailSettings[0])
        # built the message
        msg = MIMEText(massage, 'plain', 'utf-8')
        msg['Subject'] = emailtopic
        msg['From'] = getEmailSettings[1]
        msg['To'] = getEmailSettings[2]
        server.send_message(msg)
    except Exception as e:
        return str(e)
    return 'ok'
