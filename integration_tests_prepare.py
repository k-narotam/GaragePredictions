from api.database import db

db['users'].delete_one({'_id': 'itestacc@gmail.com'})
