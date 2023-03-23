from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from extensions import gpt


class Question(BaseModel):
    content: str


front = APIRouter()


@front.get('/api/conversation/chat', tags=['front'])
async def get_history():
    history = gpt.get_history(username='user')
    if not history:
        return {
            'content': []
        }
    else:
        return {
            'content': history
        }


@front.patch('/api/conversation/chat', tags=['front'])
async def chat(item: Question):
    reply = await gpt.chat(username='user', version='gpt-3.5-turbo', text=item.content)
    return {'content': reply}


@front.patch('/api/conversation/chat_stream', tags=['front'])
def chat_stream(item: Question):
    # reply = gpt.chat_stream(username='user', version='gpt-3.5-turbo', text=item.content)
    return StreamingResponse(gpt.chat_stream(username='user', version='gpt-3.5-turbo', text=item.content))


@front.delete('/api/conversation/chat', tags=['front'])
async def delete_history():
    gpt.delete_history()
    return {'code': 1}
