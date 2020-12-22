from flask import request
import sendEmail
from initApp import app


@app.route("/api/about_us", methods=["POST"])
def send_q_email():
    SP_paremeters_as_dict = request.get_json(force=True)
    return sendEmail.sendEmail(
        SP_paremeters_as_dict["senderName"],
        SP_paremeters_as_dict["massage"],
        SP_paremeters_as_dict["emailtopic"],
    )
