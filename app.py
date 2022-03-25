from imp import load_dynamic
from json import load
import os
import time
import bcrypt
import pymongo
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, current_user, login_required, login_user, logout_user

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

def get_current_user():
    try:
        email = current_user.email
        return current_user
    except:
        return None

class User(UserMixin):
    def __init__(self):
        self.password_hash = None
        self.password_salt = None
        self.email = None
        self.id = None
        self.loaded = False

    # use to initialize a user from data (only used in registration)
    def create(self, password_hash, password_salt, email):
        self.password_hash = password_hash
        self.password_salt = password_salt
        self.email = email
        self.id = email
        self.loaded = True
        return self

    # check if a user exists
    @property
    def exists(self):
        if db['users'].find_one({'_id': self.email}):
            return True
        return False

    # save a user to the database (WILL OVERWRTIE)
    def save(self):
        db['users'].update_many({'_id': self.id}, {'$set': {'email': self.email, 'password': self.password_hash, 'salt': self.password_salt}}, upsert=True)

    # load a user from the database based on an email
    def load(self, email):
        user_record = db['users'].find_one({'_id': email})
        if user_record:
            self.id = user_record['email']
            self.email = user_record['email']
            self.password_hash = user_record['password']
            self.password_salt = user_record['salt']
            self.loaded = True

        return self

    # log a user in (and create a session) through flask-login
    def login(self):
        login_user(self)
        user_sessions[self.id] = self

    # log a user out through flask-login
    def logout(self):
        logout_user(self)


# this is used when creating session tokens among other things
SECRET_KEY = os.urandom(24)
app.config['SECRET_KEY'] = SECRET_KEY

user_sessions = {}

# a required flask-login utility function
@login_manager.user_loader
def load_user(user_id):
    return user_sessions[user_id]

# root page
@app.route('/', defaults={'path':''})
def root_page(path):
    return send_from_directory(app.static_folder, 'index.html')

# register
@app.route('/register', methods=['POST'])
def register():
    password = request.json['password'].encode('utf-8')
    email = request.json['email']
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(password, salt)
    new_user = User().create(password_hash, salt, email)
    print(password, email, salt, password_hash)
    if new_user.exists:
        return jsonify({'error': 'user already exists'})
    else:
        new_user.save()
        return jsonify({'error': ''})

# login endpoint
@app.route('/login', methods=['POST'])
def login_end():
    password = request.json['password'].encode('utf-8')
    email = request.json['email']
    my_user = User().load(email)
    
    if my_user.exists:
        if (bcrypt.hashpw(password, my_user.password_salt) != my_user.password_hash):
            return jsonify({'error': 'user does not exist'})
        else:
            my_user.login(my_user)
            return jsonify({'error': ''})
    else:
        return jsonify({'error': 'user does not exist'})

   
# logout endpoint
@app.route('/logout', methods=['POST'])
def logout_end():
    my_user = get_current_user()
    my_user.logout()
    return jsonify({'error': ''})


# delete account
@app.route('/delete_acc', methods=['POST'])
def del_acc():
    id = request.json['id']

    if User().exists(id) is False:
        return jsonify({"error" : "Account does not exist"})

    count = db['users'].delete_one({"_id" : id})
    return jsonify({"error" : count.deleted_count})

# to be added..
# ForgotPassword
# (Add/Remove/List Favorites)
# Capacity
# Status

# test endpoint
@app.route('/time')
def get_time():
    return jsonify({'time': time.time()})

@app.route('/test', methods=["GET"])
def test():
    return jsonify({"response" : "This is a test"})

# should be very last thing (NOTHING BELOW)
if __name__ == '__main__':
    print(db['users'].find_one({}))
    app.run(debug=True, port=9090)
