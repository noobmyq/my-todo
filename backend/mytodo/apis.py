'''
Date: 2021-12-21 17:45:56
LastEditTime: 2021-12-22 10:04:14
FilePath: /new-simple-todo/my-todo/backend/mytodo/apis.py
'''
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from app import models, schemas
# from app import app

app = FastAPI()

# add origins
origins = [
    "http://localhost:3000",
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

# todo items


@app.get("/todo", tags=["todo"])
async def get_todos() -> dict:
    return{"data": todos}
