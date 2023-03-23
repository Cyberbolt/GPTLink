import asyncio
from concurrent.futures import ThreadPoolExecutor

from config import openai


CONVERSAIION = {}


def get_history(username: str) -> list:
    gpt = CONVERSAIION.get(username)
    if not gpt:
        return False
    else:
        return gpt.messages


async def chat(username: str, version: str = 'gpt-3.5-turbo', text: str = '') -> str:
    if not CONVERSAIION.get(username):
        CONVERSAIION[username] = GPT(version=version)
    return await CONVERSAIION[username].reply(text)


async def chat_stream(username: str, version: str = 'gpt-3.5-turbo', text: str = ''):
    if not CONVERSAIION.get(username):
        CONVERSAIION[username] = GPT(version=version)
    return CONVERSAIION[username].reply_stream(text)


def delete_history(username: str):
    if CONVERSAIION.get(username):
        del CONVERSAIION[username]


class GPT:
    def __init__(self, version: str = 'gpt-3.5-turbo'):
        self.version = version
        self.messages = []

    async def reply(self, text: str) -> str:
        self.messages.append({'role': 'user', 'content': text})
        response = await asyncio.to_thread(
            openai.ChatCompletion.create,
            model=self.version,
            messages=self.messages
        )
        result = response['choices'][0].message['content']
        self.messages.append({'role': 'assistant', 'content': result})
        return result

    async def reply_stream(self, text: str):
        self.messages.append({'role': 'user', 'content': text})
        response = await asyncio.to_thread(
            openai.ChatCompletion.create,
            model=self.version,
            messages=self.messages,
            stream=True
        )
        result = ''
        for part in response:
            finish_reason = part['choices'][0]['finish_reason']
            finish_reason = part['choices'][0]['finish_reason']
            if 'content' in part['choices'][0]['delta']:
                content = part['choices'][0]['delta']['content']
                yield content
                result += content
            elif finish_reason:
                pass
        print('1' + result)
        self.messages.append({'role': 'assistant', 'content': result})
