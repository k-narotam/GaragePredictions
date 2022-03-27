import time
import requests
from bs4 import BeautifulSoup

import bcrypt
from flask import jsonify, request, send_from_directory
from flask_login import current_user, login_required, logout_user

from .constants import garage_to_id
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
    @login_required
    def logout_end():
        my_user = get_current_user()
        my_user.logout()
        return jsonify({'error': ''})

    # a test endpoint to ensure logins are working properly
    @app.route('/test_profile', methods=['GET'])
    @login_required
    def test_profile():
        user = get_current_user()
        return jsonify({'email': user.email})

    # delete account
    @app.route('/delete_acc', methods=['POST'])
    def del_acc():
        id = request.json['id']

        if User().exists(id) is False:
            return jsonify({"error" : "Account does not exist"})

        count = db['users'].delete_one({"_id" : id})
        return jsonify({"error" : count.deleted_count})

    # test endpoint
    @app.route('/time', methods=['POST', 'GET'])
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

    @app.route('/status', methods=['POST', 'GET'])
    def status():
        r = requests.get('http://secure.parking.ucf.edu/GarageCount/iframe.aspx')
        raw_text = r.text
        soup = BeautifulSoup(raw_text, 'html.parser')
        garage_data = {'timestamp': time.time(), 'data': []}
        for garage_html in list(soup.find_all('tr', {'class': 'dxgvDataRow_DevEx'})):
            garage_cols = [col.text for col in garage_html.find_all('td')]
            if len(garage_cols) >= 2:
                info = {
                    'id': garage_to_id[garage_cols[0]],
                    'name': garage_cols[0],
                    'spaces_avail': garage_cols[1].split('/')[0][1:],
                    'spaces_total': garage_cols[1].split('/')[1].split('\r')[0],
                }
                garage_data['data'].append(info)
        return jsonify(garage_data)

    # change password 
    @app.route('/change_password', methods=['POST'])
    def change_password():
        # getting requests
        id = request.json['id']
        new_password = request.json['new_password'].encode('utf-8')
        db_info = db['users'].find_one({"_id" : id})

        # check if the user exists
        if User().user_exist(id) is False:
            return jsonify({"error" : "Account does not exist"})

        # generate new password
        salt = db_info['salt']
        new_password_hash = bcrypt.hashpw(new_password, salt)

        # update on the database
        id_query = { "_id" : id }
        new_query = { "$set": { "password": new_password_hash, "salt" : salt }}
        db['users'].update_one(id_query, new_query)

        return jsonify({"error" : ""})

    # chec password the password - PedroFC
    @app.route('/check_password', methods=['GET'])
    def check_password():

        # get request info
        id = request.json['id']
        to_check_password = request.json['password']

        # get the info from database
        db_info = db['users'].find_one({"_id" : id})
        salt = db_info['salt']

        # get/create hash for passwords
        curr_password_hash = db_info['password']
        my_pass_hash = bcrypt.hashpw(to_check_password.encode('utf-8'), salt)

        if (my_pass_hash != curr_password_hash):
            return jsonify({"error" : "Passwords are not the same"})

        return jsonify({"error" : ""})

