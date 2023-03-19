from fastapi import APIRouter
from pydantic import BaseModel


class Question(BaseModel):
    content: str


front = APIRouter()


front.post('/api/chat')
def chat(item: Question):
    return {}