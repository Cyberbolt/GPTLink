from fastapi import APIRouter
from pydantic import BaseModel

from extensions import gpt


class Question(BaseModel):
    content: str


front = APIRouter()


front.get('/api/conversation/chat')
def get_history():
    history = gpt.get_history(username='user')
    if not history:
        return {
            'content': []
        }
    else:
        return {
            'content': history
        }


front.patch('/api/conversation/chat')
def chat(item: Question):
    reply = gpt.chat(username='user', version='gpt-3.5-turbo', text=item.content)
    return {'content': reply}


front.delete('/api/conversation/chat')
def delete_history():
    gpt.delete_history()
    return True
