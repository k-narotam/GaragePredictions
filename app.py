import os
import time

import bcrypt
import pymongo
from flask import Flask
from flask_cors import CORS
from flask_mail import Mail


from api.database import db
from api.structures import login_manager
from api.endpoints import generate_endpoints

app = Flask(__name__)
CORS(app)
login_manager.init_app(app)

mail = Mail(app)
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'garagepredictions@gmail.com'
app.config['MAIL_PASSWORD'] = 'group17POOS'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)
generate_endpoints(app, mail)

# this is used when creating session tokens among other things
SECRET_KEY = os.urandom(24)
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True

# should be very last thing (NOTHING BELOW)
if __name__ == '__main__':
    app.run(debug=True, port=9090)
