import os
import time

import bcrypt
import pymongo
from flask import Flask
from flask_cors import CORS

from api.database import db
from api.structures import login_manager
from api.endpoints import generate_endpoints

app = Flask(__name__, static_url_path='', static_folder='frontend/public')
CORS(app)
login_manager.init_app(app)
generate_endpoints(app)

# this is used when creating session tokens among other things
SECRET_KEY = os.urandom(24)
app.config['SECRET_KEY'] = SECRET_KEY

# to be added..
# ForgotPassword
# (Add/Remove/List Favorites)
# Capacity
# Status


# should be very last thing (NOTHING BELOW)
if __name__ == '__main__':
    print(db['users'].find_one({}))
    app.run(debug=True, port=9090)
