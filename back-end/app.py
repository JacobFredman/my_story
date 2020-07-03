from initApp import *

from allViews import *


@app.route("/hhh")
def hhh():
    return "hhh"


if __name__ == "__main__":
    app.run(threaded=True)
