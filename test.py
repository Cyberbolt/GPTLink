import os

import openai

API_KEY = os.environ.get('API_KEY')
openai.api_key = API_KEY


def main():
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[
            {"role": "user", "content": "你是谁？"},
        ]
    )
    content = response['choices'][0].message['content']
    print(content, '\n', type(content))
    

if __name__ == '__main__':
    main()