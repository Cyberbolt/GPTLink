import os

import openai

API_KEY = os.environ.get('API_KEY')
openai.api_key = API_KEY


def test1():
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[
            {'role': 'user', 'content': "使用 FastAPI 返回 Hello World"},
        ]
    )
    content = response['choices'][0].message['content']
    print(content)
    return content


def test2():
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[
            {'role': 'user', 'content': "你会限制问题吗"},
        ],
        stream=True
    )
    answer = ''
    for part in response:
        finish_reason = part['choices'][0]['finish_reason']
        finish_reason = part['choices'][0]['finish_reason']
        if 'content' in part['choices'][0]['delta']:
            content = part['choices'][0]['delta']['content']
            print(content, end='')
            answer += content
        elif finish_reason:
            pass
    print('')
    # print(answer)


def main():
    test1()
    

if __name__ == '__main__':
    main()