
def pythonValuesToFileValues(val):
    if val is None:
        return val
    elif val is True:
        return 'כן'
    elif val is False:
        return ''
    # elif val isinstance(val, decimal):
    #     return str(val)
    else:
        return str(val)