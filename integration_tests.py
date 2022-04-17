import time

import pytest
from flask import session

from app import app
from api.structures import User
from api.database import db
import bcrypt

@pytest.fixture()
def client():
    return app.test_client()

def test_login_valid(client):

   # Make test verified test account
    password = ('qwertypass').encode('utf-8')
    email = 'qwerty@gmail.com'
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(password, salt)
    new_user = User().create(password_hash, salt, email)
    new_user.confirmed = True
    new_user.save()

    r = client.post('/login', json={'email': 'qwerty@gmail.com', 'password': 'qwertypass'})
    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == ''

def test_login_invalid_email(client):
    r = client.post('/login', json={'email': 'qwertya@gmail.com', 'password': 'qwertypass'})
    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == 'Account Does Not Exist'

def test_login_invalid_pass(client):
    r = client.post('/login', json={'email': 'qwerty@gmail.com', 'password': 'qwertypasss'})
    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == 'Invalid Username/Password'

def test_register_invalid_email(client):
    r = client.post('/register', json={'email': 'qwerty@gmail.com', 'password': 'newpass'})
    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == 'User Already Exists'

def test_register(client):
    db['users'].delete_one({'_id': 'itestacc@gmail.com'})
    
    r = client.post('/register', json={'email': 'itestacc@gmail.com', 'password': 'newpass'})

    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == ''

def test_delete_acc(client):

    # Confirm test account
    user = User().load('itestacc@gmail.com')
    user.confirmed = True
    user.save()

    r = client.post('/login', json={'email': 'itestacc@gmail.com', 'password': 'newpass'})
    r2 = client.post('/delete_acc')
    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == ''

    assert r2.status_code == 200
    assert isinstance(r2.json, dict)
    assert r2.json['error'] == ''

def test_delete_acc_unauthorized(client):
    r = client.post('/delete_acc')
    assert r.status_code == 401

def test_logout_unauthorized(client):
    r = client.post('/logout')
    assert r.status_code == 401

def test_logout(client):
    r = client.post('/login', json={'email': 'qwerty@gmail.com', 'password': 'qwertypass'})
    r2 = client.post('/logout')
    r3 = client.post('/logout')
    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == ''

    assert r2.status_code == 200
    assert isinstance(r2.json, dict)
    assert r2.json['error'] == ''

    assert r3.status_code == 401

def test_status(client):
    r = client.get('/status')
    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert 'data' in r.json
    assert len(r.json['data']) == 7
    assert all([all([f in d for f in ['id', 'name', 'spaces_avail', 'spaces_total']]) for d in r.json['data']])
    assert 'timestamp' in r.json
    assert abs(r.json['timestamp'] - time.time()) < 2

def test_predict(client):
    r = client.post('/predict', json={'garage_id': 'i', 'hour': 27.4})
    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == ''
    assert 'avail_prediction' in r.json
    assert type(r.json['avail_prediction']) in [int, float]

def test_predict_invalid(client):
    r = client.post('/predict', json={'garage_id': 'qq', 'hour': 27.4})
    r2 = client.post('/predict', json={'garage_id': 'i'})

    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == 'invalid garage id'

    assert r2.status_code == 200
    assert isinstance(r2.json, dict)
    assert r2.json['error'] == 'invalid arguments'

def test_trend(client):
    r = client.post('/trend', json={'garage_id': 'i', 'day': 2})

    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == ''
    assert 'predictions' in r.json
    assert type(r.json['predictions']) == list
    assert all([type(v) in [int, float] for v in r.json['predictions']])

def test_trend_invalid(client):
    r = client.post('/trend', json={'garage_id': 'qq', 'day': 2})
    r2 = client.post('/trend', json={'garage_id': 'i'})

    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == 'invalid garage id'

    assert r2.status_code == 200
    assert isinstance(r2.json, dict)
    assert r2.json['error'] == 'invalid arguments'

def test_favorites(client):
    r = client.post('/login', json={'email': 'qwerty@gmail.com', 'password': 'qwertypass'})
    r2 = client.post('/list_favorites', json={'garage_id': ""})
    r3 = client.post('/add_favorite', json={'garage_id': 'i', 'weekday': 'tue', 'time': 2.2})
    r4 = client.post('/add_favorite', json={'garage_id': 'i', 'weekday': 'tue', 'time': 3.2})
    r10 = client.post('/add_favorite', json={'garage_id': 'i', 'weekday': 'tue', 'time': 3.2})
    r5 = client.post('/list_favorites', json={'garage_id': ""})
    r6 = client.post('/delete_favorite', json={'garage_id': 'i', 'weekday': 'tue', 'time': 2.2})
    r7 = client.post('/delete_favorite', json={'garage_id': 'i', 'weekday': 'tue', 'time': 3.2})
    r8 = client.post('/list_favorites', json={'garage_id': ""})
    r9 = client.post('/delete_favorite', json={'garage_id': 'i', 'weekday': 'tue', 'time': 3.2})

    assert r.status_code == 200
    assert isinstance(r.json, dict)
    assert r.json['error'] == ''

    for rn in [r2, r8]:
        assert rn.status_code == 200
        assert isinstance(rn.json, dict)
        assert rn.json['error'] == ''
        assert type(rn.json['favorites']) == list
        assert len(rn.json['favorites']) == 0

    for rn in [r3, r4, r6, r7]:
        assert rn.status_code == 200
        assert isinstance(rn.json, dict)
        assert rn.json['error'] == ''

    assert r5.status_code == 200
    assert isinstance(r5.json, dict)
    assert r5.json['error'] == ''
    assert 'favorites' in r5.json
    assert type(r5.json['favorites']) == list
    assert len(r5.json['favorites']) == 2
    assert all([all([f in d for f in ['user_id', 'garage_id', 'time', 'weekday']]) for d in r5.json['favorites']])

    assert r9.status_code == 200
    assert isinstance(r9.json, dict)
    assert r9.json['error'] == 'favorite prediction does not exist'

    assert r10.status_code == 200
    assert isinstance(r10.json, dict)
    assert r10.json['error'] == 'favorite prediction already exists'

def test_favorites_unauth(client):
    r = client.post('/list_favorites', json={'garage_id': ''})
    r2 = client.post('/add_favorite', json={'garage_id': 'i', 'weekday': 'tue', 'time': 2.2})
    r3 = client.post('/delete_favorite', json={'garage_id': 'i', 'weekday': 'tue', 'time': 2.2})

    assert r.status_code == 401
    assert r2.status_code == 401
    assert r3.status_code == 401
