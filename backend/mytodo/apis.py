'''
Date: 2021-12-21 17:45:56
LastEditTime: 2021-12-22 12:11:26
FilePath: /new-simple-todo/my-todo/backend/mytodo/apis.py
'''
from typing import Any, Optional

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Body
from pydantic import BaseModel, Field
from starlette.responses import StreamingResponse
# from app import models, schemas
# from app import app

app = FastAPI()

# add origins
origins = [
    # "http://localhost:3000",
    "*"
]

# middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# first api
@app.get("/", tags=["root"])
async def read_root() -> Any:
    return {"Hello World!"}


class Item(BaseModel):
    id: str
    item: str


todos = [
    {
        "id": "1",
        "item": "Read a book."
    },
    {
        "id": "2",
        "item": "Cycle around town."
    }
]


# get todo items
@app.get("/todo", tags=["todo"])
async def get_todos():
    return{"data": todos}


@app.post("/clear", tags=["clear"])
async def clear_items():
    todos.clear()
    return{"data": "Clear"}

# post todo items


@app.post("/todo", tags=["todos"])
async def add_todo(todo: Item):
    todos.append(jsonable_encoder(todo))
    return{
        "data": {"Todo added."}
    }
