from audioop import cross
import json
import re
from sre_constants import OP_IGNORE
import time
import datetime # to track tokens
import requests
from bs4 import BeautifulSoup

import bcrypt
from flask import jsonify, flash, make_response, request, redirect, send_from_directory, url_for, render_template, Response, session
from flask_login import current_user, login_required, logout_user
from flask_mail import Mail, Message
from flask_cors import cross_origin

from .constants import garage_to_id, weekdays, garage_pos, detGarage, detWeek, origins, front_head, garage_capacities
from .structures import User, Favorite, user_sessions
from .database import db
from .ml_wrapper import models
from .emailtoken import confirm_token, generate_confirmation_token

def generate_endpoints(app, mail):

    # get
    def get_current_user():
        try:
            email = current_user.email
            return current_user
        except:
            return None

    @app.route('/', defaults={'path':''})
    def root_page(path):
        return "<h1>API Root</h1>"
        # return send_from_directory(app.static_folder, 'index.html')

    # register
    @app.route('/register', methods=['POST'])
    @cross_origin()
    def register():
        password = request.json['password'].encode('utf-8')
        email = request.json['email']
        salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(password, salt)
        new_user = User().create(password_hash, salt, email)

        if new_user.exists and new_user.confirmed_account:
            return jsonify({'error': 'User Already Exists'})
        else:
            new_user.save()
            token = generate_confirmation_token(email)
            confirm_url = front_head + '/verify/' + token
            html = render_template('register.html', confirm_url=confirm_url)
            subject = "Verify UCF Garage Predictions Account"
            send_email(email, subject, html)
            return jsonify({'error': ''})

    # login endpoint
    @app.route('/login', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def login_end():
        password = request.json['password'].encode('utf-8')
        email = request.json['email']
        my_user = User().load(email)
        
        if my_user.exists:
            if (bcrypt.hashpw(password, my_user.password_salt) != my_user.password_hash):
                return jsonify({'error': 'Invalid Username/Password'})
            
            elif not my_user.confirmed:
                return jsonify({'error': 'Unconfirmed Account'})
            else:
                my_user.login()
                resp = make_response(jsonify({'error': ''}))
                return resp

        else:
            return jsonify({'error': 'Account Does Not Exist'})

    # for use to change email confirmation, email verification not operational
    @app.route('/send_recovery', methods=['POST'])
    def recovery_email():
        id = request.json['email']
        if User.user_exist(id) is False:
            return jsonify({"error" : "invalid user id"})

        token = generate_confirmation_token(id)

        confirm_url = front_head + '/recover_password/' + token
        html = render_template('password.html', confirm_url=confirm_url)
        subject = "Reset Password"
        send_email(id, subject, html)

        return jsonify({'error' : ""})

    def send_email(to , subject, template):
        msg = Message(subject, recipients=[to], html = template, sender="garagepredictions@gmail.com")
        mail.send(msg)

    # used to recover password with token
    @app.route('/recover_password/<token>', methods=['POST'])
    def recover_change_password(token):
        try:
           email = confirm_token(token)
           if not email:
               return jsonify({'error': "invalid recovery link"})
        except:
           return jsonify({'error' : "recovery link expired"})

        if email:
            user = User().load(email)
            id = user.id
            new_password = request.json['new_password'].encode('utf-8')
            db_info = db['users'].find_one({"_id" : id})

            # check if the user exists
            if not User().user_exist(id):
                return jsonify({'error': 'No account associated with this email'})

            # generate new password
            salt = db_info['salt']
            new_password_hash = bcrypt.hashpw(new_password, salt)

            # update on the database
            id_query = { "_id" : id }
            new_query = { "$set": { "password": new_password_hash, "salt" : salt }}
            db['users'].update_one(id_query, new_query)
        else:
            return jsonify({'error' : "No account associated with this email"})

        return jsonify({"error" : ""})


    # used to confirm account with registration token
    @app.route("/confirm_registration/<token>", methods=['GET'])
    def confirm_registration(token):
        try:
           email = confirm_token(token)
           if not email:
               return jsonify({'error': "invalid confirmation link"})
        except:
           return jsonify({'error' : "confirmation link expired"})

        my_user = User().load(email)
        if my_user.confirmed:
            return jsonify({'error' : "already confirmed"})
        else:
            id_query = { "_id" : email }
            new_query = { "$set": { "confirmed": True}}
            db['users'].update_one(id_query, new_query)
            return jsonify({'error' : ""})
            # flash("You have confirmed your account")
            # return redirect(url_for('/confirm_email'))

    # logout endpoint
    @app.route('/logout', methods=['POST'])
    @cross_origin(supports_credentials=True, origins=origins)
    @login_required
    def logout_end():
        my_user = get_current_user()
        my_user.logout()
        return jsonify({'error': ''})

    # a test endpoint to ensure logins are working properly
    @app.route('/test_profile', methods=['GET'])
    @cross_origin(supports_credentials=True, origins=origins)
    @login_required
    def test_profile():
        user = get_current_user()
        return jsonify({'email': user.email})

    # delete account
    @app.route('/delete_acc', methods=['POST'])
    @cross_origin(supports_credentials=True, origins=origins)
    @login_required
    def del_acc():
        my_user = get_current_user()

        db['users'].delete_one({"_id" : my_user.id})
        db['favorites'].delete_many({"user_id" : my_user.id})
        return jsonify({"error" : ""})

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
                return jsonify({'error': '', 'avail_prediction': models[garage_id].predict([{'week_progress': week_hour, 'weather': weather}])[0]})
            else:
                return jsonify({'error': 'invalid garage id'})
        except KeyError:
            return jsonify({'error': 'invalid arguments'})

    @app.route('/predict_many', methods=['POST'])
    def predict_many():
        samples = []
        garage_id = request.json['garage_id']
        try:
            for sample in request.json['samples']:
                new_sample = {
                    'week_progress': sample['hour'],
                    'weather': 0.01, # placeholder
                }
                samples.append(new_sample)
            if garage_id in models:
                return jsonify({'error': '', 'avail_prediction': models[garage_id].predict(samples)})
            else:
                return jsonify({'error': 'invalid garage id'})
        except KeyError:
            return jsonify({'error': 'invalid arguments'})


    @app.route('/trend', methods=['POST'])
    def predict_trend():
        try:
            garage_id = request.json['garage_id']
            week_hour = 24 * request.json['day']
            weather = 0.01 # placeholder
            if garage_id in models:
                preds_day = []
                for i in range(24):
                    preds_day.append(models[garage_id].predict([{'week_progress': week_hour + i, 'weather': weather}])[0])
                return jsonify({'error': '', 'predictions': preds_day})
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
    @cross_origin(supports_credentials=True, origins=origins)
    @login_required
    def change_password():
        try:
            # getting requests
            id = get_current_user().id
            new_password = request.json['new_password'].encode('utf-8')
            db_info = db['users'].find_one({"_id" : id})

            # check if the user exists
            if not User().user_exist(id):
                return jsonify({"error" : "invalid user id"})

            # generate new password
            salt = db_info['salt']
            new_password_hash = bcrypt.hashpw(new_password, salt)

            # update on the database
            id_query = { "_id" : id }
            new_query = { "$set": { "password": new_password_hash, "salt" : salt }}
            db['users'].update_one(id_query, new_query)

            return jsonify({"error" : ""})

        except KeyError:
            return jsonify({'error': 'invalid arguments'})

    # chec password the password - PedroFC
    @app.route('/check_password', methods=['GET'])
    def check_password():
        try:
            # get request info
            id = request.json['id']
            to_check_password = request.json['password']

            # check if the user exists
            if User().user_exist(id) is False:
                return jsonify({"error" : "invalid user id"})

            # get the info from database
            db_info = db['users'].find_one({"_id" : id})
            salt = db_info['salt']

            # get/create hash for passwords
            curr_password_hash = db_info['password']
            my_pass_hash = bcrypt.hashpw(to_check_password.encode('utf-8'), salt)

            if (my_pass_hash != curr_password_hash):
                return jsonify({"error" : "passwords are not the same"})

            return jsonify({"error" : ""})

        except KeyError:
            return jsonify({'error': 'invalid arguments'})

    # adds a prediction to favorites collection
    @app.route('/add_favorite', methods = ['POST'])
    @cross_origin(supports_credentials=True, origins=origins)
    @login_required
    def add_favorite():
        my_user = get_current_user()

        garage_id = request.json['garage_id']
        if detGarage(garage_id) == False:
            return jsonify({"error" : "invalid garage id"})

        weekday = request.json['weekday']
        if detWeek(weekday) == False:
            return jsonify({"error" : "invalid day of the week"})

        time = request.json['time']

        if Favorite().exists(my_user.id, garage_id, time, weekday) == True:
            return jsonify({"error" : "favorite prediction already exists"})

        # creates an instance of a prediction and adds to favorites db with user_id
        fav = Favorite().create(weekday, time, my_user.id, garage_id)
        fav.save()

        return jsonify({"error" : ""})


    # delete from favorites collection
    @app.route('/delete_favorite', methods = ['POST'])
    @cross_origin(supports_credentials=True, origins=origins)
    @login_required
    def delete_favorite():
        my_user = get_current_user()

        garage_id = request.json['garage_id']
        if detGarage(garage_id) == False:
            return jsonify({"error" : "invalid garage id"})

        weekday = request.json['weekday']
        if detWeek(weekday) == False:
            return jsonify({"error" : "invalid day of the week"})

        time = request.json['time']
        num = garage_pos(garage_id)

        if Favorite().exists(my_user.id, garage_id, time, weekday) == False:
            return jsonify({"error" : "favorite prediction does not exist"})
        else:
            db['favorites'].find_one_and_delete({'user_id' : my_user.id, 'garage_id' : garage_id, 'time' : time, 'weekday' : weekday})
            return jsonify({"error" : ""})

    @app.route('/list_favorites', methods=['POST'])
    @cross_origin(supports_credentials=True, origins=origins)
    @login_required
    def list_favorites():

        def cap_percentage(percentage):
            if percentage > 1:
                return 1
            elif percentage < 0:
                return 0
            else:
                return percentage

        my_user = get_current_user()
        garage = request.json['garage_id']

        if garage == '':
            favorites = db['favorites'].find({'user_id' : my_user.id})

        elif not detGarage(garage):
            return jsonify({"error" : "invalid garage id"})

        else:
            favorites = db['favorites'].find({'user_id' : my_user.id, 'garage_id' : garage})

        favorites = list(favorites)
        for favorite in favorites:
            weekday = weekdays.index(favorite['weekday']) * 24
            time = favorite['time']
            week_hour = weekday + time
            weather = 0.01 # placeholder
            favorite['garage_fullness'] = models[favorite['garage_id']].predict([{'week_progress': week_hour, 'weather': weather}])[0]
            favorite['garage_fullness'] = 1 - cap_percentage(favorite['garage_fullness'] / garage_capacities[favorite['garage_id']])

        # returns json data (even if it's empty)
        return jsonify({'favorites': list(favorites), 'error': ''})
