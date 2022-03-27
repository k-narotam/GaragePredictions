import os

import pymongo
from dotenv import load_dotenv

# load from .env file
load_dotenv('.env')
URI = os.getenv('URI')

db_client = pymongo.MongoClient(URI, connectTimeoutMS=30000, socketTimeoutMS=None, connect=False, maxPoolsize=1)
db = db_client['garage']
