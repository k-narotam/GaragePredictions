import os

from dotenv import load_dotenv
from pydoc import html
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Message, Mail

from .structures import User

load_dotenv('.env')
SECRET_KEY = os.getenv('SECRET_KEY')
SECURITY_PASSWORD_SALT = os.getenv('SECURITY_PASSWORD_SALT')
MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER')

# functions dealing with email and token generations
def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(SECRET_KEY)
    return serializer.dumps(email, salt=SECURITY_PASSWORD_SALT)

def confirm_token(token, expiration = 3600):
    serializer = URLSafeTimedSerializer(SECRET_KEY)
    try:
        email = serializer.loads(token, salt=SECURITY_PASSWORD_SALT, max_age=expiration)
    except:
        return False
    return email

def send_email(to, subject, template, mail):
    msg = Message(subject, recipients=[to], html=template, sender=MAIL_DEFAULT_SENDER)
    mail.send(msg)
