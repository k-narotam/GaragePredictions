import os
import time
import bcrypt
import pymongo
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager

user_sessions = {}

# load from .env file
load_dotenv('.env')
URI = os.getenv('URI')

app = Flask(__name__, static_url_path='', static_folder='frontend/public')
CORS(app)
login_manager = LoginManager()
login_manager.init_app(app)

# REPLACE ME
db_client = pymongo.MongoClient(URI, connectTimeoutMS=30000, socketTimeoutMS=None, connect=False, maxPoolsize=1)
db = db_client['garage']

# this is used when creating session tokens among other things
SECRET_KEY = os.urandom(24)
app.config['SECRET_KEY'] = SECRET_KEY

# a required flask-login utility function
@login_manager.user_loader
def load_user(user_id):
    return user_sessions[user_id]


# to be added..
# ForgotPassword
# (Add/Remove/List Favorites)
# Capacity
# Status


# should be very last thing (NOTHING BELOW)
if __name__ == '__main__':
    print(db['users'].find_one({}))
    app.run(debug=True, port=9090)
