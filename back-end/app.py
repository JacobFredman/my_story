from initApp import *

from allViews import *

app = Flask(__name__, static_url_path="")


@app.route("/hhh")
def hhh():
    return "hhh"


@app.route("/jac")
def jac():
    return "hhh"


@app.route("/js/<path:path>")
def send_js(path):
    return send_from_directory("js", path)


if __name__ == "__main__":
    app.run(threaded=True)
