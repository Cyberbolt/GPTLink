from config import openai


CONVERSAIION = {}


def get_history(username: str) -> list:
    gpt = CONVERSAIION.get(username)
    if not gpt:
        return False
    else:
        return gpt.messages
    

def chat(username: str, version: str = 'gpt-3.5-turbo', text: str = '') -> str:
    if not CONVERSAIION.get(username):
        CONVERSAIION[username] = GPT(version=version)
    return CONVERSAIION[username].reply(text)


def delete_history(username: str):
    if CONVERSAIION.get(username):
        del CONVERSAIION[username]


class GPT:
    def __init__(self, version: str = 'gpt-3.5-turbo'):
        self.version = version
        self.messages = []

    def reply(self, text: str):
        self.messages.append({'role': 'user', 'content': text})
        response = openai.ChatCompletion.create(
            model=self.version,
            messages=self.messages
        )
        result = response['choices'][0].message['content']
        self.messages.append({'role': 'assistant', 'content': result})
        return result
