from pydoc import html
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Message, Mail

from .structures import User

# functions dealing with email and token generations
def generate_confirmation_token(key, salt, email):
    serializer = URLSafeTimedSerializer(key)
    return serializer.dumps(email, salt)

def confirm_token(token, key, salt, expiration):
    serializer = URLSafeTimedSerializer(key)
        
    try:
        email = serializer.loads(token, salt, expiration)
    except:
        return False

    return email


def send_email(email, subject, template, mail):
    msg = Message(subject, recipients=[email], html=template, sender="garagepredictions@gmail.com")
    mail.send(msg)