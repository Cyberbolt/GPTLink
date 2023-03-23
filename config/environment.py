import os

import openai


API_KEY = os.environ.get('API_KEY')
openai.api_key = API_KEY