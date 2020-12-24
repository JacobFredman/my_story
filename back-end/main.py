import os

from initApp import *

from allViews import *


app = app # important!!


@app.route("/api/hhh")
def hhh():
    return "hhh"



# Serve React App
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>/")
def serve(path):
    print("path : " + path)
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        print("not index")
        return send_from_directory(app.static_folder, path)
    else:
        print("index")
        return send_from_directory(app.static_folder, "index.html")

# Serve React App
# @app.route("/", defaults={"path": ""})

# @app.route("/<path:path>")
# def serve(path=''):
#     if path == 'api':
#         print('apiiiii')
#         pass
#     if path != "" and os.path.exists(app.static_folder + "/" + path):
#         print(app.static_folder + "/" + path)
#         return send_from_directory(app.static_folder, path)
#     else:
#         print("aaa" + app.static_folder + "/" + path)
#         return send_from_directory(app.static_folder, "index.html")



@app.route("/jac")
def jac():
    return "hhh"





# @app.route("/js/<path:path>")
# def send_js(path):
#     return send_from_directory("js", path)


if __name__ == "__main__":
    app.run(threaded=True)
