from flask import Blueprint, request
import sendEmail

about_us = Blueprint('about_us', __name__)


@about_us.route('/a')
def aa():
    return 'Hello, a!'


@about_us.route('/about_us', methods=['POST'])
def accountList():
    SP_paremeters_as_dict = request.get_json(force=True)
    return sendEmail.sendEmail(
        SP_paremeters_as_dict['senderName'],
        SP_paremeters_as_dict['massage'],
        SP_paremeters_as_dict['emailtopic'],
    )
