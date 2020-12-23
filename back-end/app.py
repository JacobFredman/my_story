import os

from initApp import *

from allViews import *


app = app


@app.route("/api/hhh")
def hhh():
    return "hhh"


@app.route("/jac")
def jac():
    return "hhh"


# Serve React App
# @app.route("/", defaults={"path": ""})
# @app.route("/<path:path>")
# def serve(path):
#     print("kkk")
#     if path != "" and os.path.exists(app.static_folder + "/" + path):
#         print("not index")
#         return send_from_directory(app.static_folder, path)
#     else:
#         print("index")
#         return send_from_directory(app.static_folder, "index.html")


# @app.route("/js/<path:path>")
# def send_js(path):
#     return send_from_directory("js", path)


if __name__ == "__main__":
    app.run(threaded=True)
