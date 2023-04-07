from fastapi import APIRouter, WebSocket
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


@front.post('/api/conversation/chat', tags=['front'])
async def chat(item: Question):
    answer = await gpt.chat(username='user', version='gpt-3.5-turbo', text=item.question)
    return {'answer': answer}


@front.post('/api/conversation/chat_stream', tags=['front'])
async def chat_stream(item: Question):
    answer = await gpt.chat_stream(username='user', version='gpt-3.5-turbo', text=item.question)
    return StreamingResponse(answer)


@front.websocket('/ws/conversation/chat_stream')
async def chat_stream_ws(websocket: WebSocket):
    await websocket.accept()
    question = await websocket.receive_text()
    answer = await gpt.chat_stream(username='user', version='gpt-3.5-turbo', text=question)
    async for part in answer:
        await websocket.send_text(part)
    await websocket.close()


@front.delete('/api/conversation/chat', tags=['front'])
async def delete_history():
    gpt.delete_history()
    return {'code': 1}
