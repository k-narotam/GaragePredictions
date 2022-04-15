import itertools

from flask_login import LoginManager, login_user, logout_user, UserMixin
from .database import db
from .constants import garage_to_id


login_manager = LoginManager()

user_sessions = {}

# a required flask-login utility function
@login_manager.user_loader
def load_user(user_id):
    return user_sessions[user_id]

class User(UserMixin):
    def __init__(self):
        self.password_hash = None
        self.password_salt = None
        self.email = None
        self.id = None
        self.logged_on = False
        self.confirmed = False

    # use to initialize a user from data (only used in registration)
    def create(self, password_hash, password_salt, email):
        self.password_hash = password_hash
        self.password_salt = password_salt
        self.email = email
        self.id = email
        self.logged_on = True
        self.confirmed = False
        return self

    # check if a user exists
    @property
    def exists(self):
        if db['users'].find_one({'_id': self.id}):
            return True
        return False

    @property
    def confirmed_account(self):
        if db['users'].find_one({'_id': self.id}):
            return db['users'].find_one({'_id': self.id})['confirmed']

    # save a user to the database (WILL OVERWRITE)
    def save(self):
        db['users'].update_many({'_id': self.id}, {'$set': {'email': self.email, 'password': self.password_hash, 'salt': self.password_salt, 'confirmed': self.confirmed}}, upsert=True)

    # load a user from the database based on an email
    def load(self, email):
        user_record = db['users'].find_one({'_id': email})
        if user_record:
            self.id = user_record['email']
            self.email = user_record['email']
            self.password_hash = user_record['password']
            self.password_salt = user_record['salt']
            self.confirmed = user_record['confirmed']
            self.logged_on = True
        return self

    # log a user in (and create a session) through flask-login
    def login(self):
        login_user(self)
        user_sessions[self.id] = self

    # log a user out through flask-login
    def logout(self):
        logout_user()

    @staticmethod
    def user_exist(id):
        if db['users'].find_one({'_id': id}):
            return True
        return False


# class for predictions for use on favorites endpoint
class Favorite():

    newid = itertools.count()

    def __init__(self):
        self.weekday = None
        self.time = None
        self.user_id = None
        self.garage_id = None
        self.fav_id = None

    # initialize a prediction based on fullness, day, and hour
    def create(self, weekday, time, user_id, garage_id):
        self.weekday = weekday
        self.time = time
        self.user_id = user_id
        self.garage_id = garage_id
        self.fav_id = next(self.newid)
        return self

    def save(self):
        db['favorites'].update_many({'_id' : self.fav_id}, {'$set': {'user_id' : self.user_id, 'weekday': self.weekday, 'time': self.time, 'garage_id': self.garage_id}}, upsert=True)

    @staticmethod
    def exists(user_id, garage_id, time, weekday):
        if db['favorites'].find_one({'user_id' : user_id, 'garage_id' : garage_id, 'time' : time, 'weekday' : weekday}):
            return True
        else:
            return False
