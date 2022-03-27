from flask_login import LoginManager, login_user, logout_user, UserMixin
from .database import db

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

    # use to initialize a user from data (only used in registration)
    def create(self, password_hash, password_salt, email):
        self.password_hash = password_hash
        self.password_salt = password_salt
        self.email = email
        self.id = email
        self.logged_on = True
        return self

    # check if a user exists
    @property
    def exists(self):
        if db['users'].find_one({'_id': self.email}):
            return True
        return False

    # save a user to the database (WILL OVERWRITE)
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
            self.logged_on = True
        return self

    # log a user in (and create a session) through flask-login
    def login(self):
        login_user(self)
        user_sessions[self.id] = self

    # log a user out through flask-login
    def logout(self):
        logout_user(self)