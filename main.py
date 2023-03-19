from typing import Union

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

app = FastAPI()
app.mount("/static", StaticFiles(directory="gptlink_gui/build/static"), name="static")

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open('gptlink_gui/build/index.html') as f:
    home_page = f.read()


@app.get("/", response_class=HTMLResponse)
async def read_root():
    return home_page


@app.exception_handler(StarletteHTTPException)
async def my_custom_exception_handler(request: Request, exc: StarletteHTTPException):
    if exc.status_code == 404:
        '''
            Redirect all 404 pages to index.html
        '''
        return HTMLResponse(home_page.text)
