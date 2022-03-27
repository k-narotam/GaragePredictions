import time
import bcrypt
from flask import jsonify, request, send_from_directory
from flask_login import current_user

from .structures import User
from .database import db
from .ml_wrapper import models

def generate_endpoints(app):
    # get
    def get_current_user():
        try:
            email = current_user.email
            return current_user
        except:
            return None

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
                my_user.login()
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

    # test endpoint
    @app.route('/time')
    def get_time():
        return jsonify({'time': time.time()})

    @app.route('/predict', methods=['POST'])
    def predict():
        try:
            garage_id = request.json['garage_id']
            week_hour = request.json['hour']
            weather = 0.01 # placeholder
            if garage_id in models:
                return jsonify({'error': '', 'avail_prediction': models[garage_id].predict_one({'week_hour': week_hour, 'weather': weather})})
            else:
                return jsonify({'error': 'invalid garage id'})
        except KeyError:
            return jsonify({'error': 'invalid arguments'})
