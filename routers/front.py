from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from extensions import gpt


class Question(BaseModel):
    question: str


front = APIRouter()


@front.get('/api/conversation/chat', tags=['front'])
async def get_history():
    history = gpt.get_history(username='user')
    if not history:
        return {
            'answer': []
        }
    else:
        return {
            'answer': history
        }


@front.patch('/api/conversation/chat', tags=['front'])
async def chat(item: Question):
    answer = await gpt.chat(username='user', version='gpt-3.5-turbo', text=item.question)
    return {'answer': answer}


@front.patch('/api/conversation/chat_stream', tags=['front'])
async def chat_stream(item: Question):
    answer = await gpt.chat_stream(username='user', version='gpt-3.5-turbo', text=item.question)
    return StreamingResponse(answer)


@front.delete('/api/conversation/chat', tags=['front'])
async def delete_history():
    gpt.delete_history()
    return {'code': 1}
