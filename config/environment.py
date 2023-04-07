import os

import openai


API_KEY = os.environ.get('API_KEY')
MONGO_USERNAME = os.environ.get('MONGO_USERNAME')
MONGO_PASSWORD = os.environ.get('MONGO_PASSWORD')

openai.api_key = API_KEY