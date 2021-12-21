'''
Date: 2021-12-21 17:45:56
LastEditTime: 2021-12-21 17:53:57
FilePath: /new-simple-todo/my-todo/backend/app/apis.py
'''
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models, schemas
from app import app

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


# example
@app.get("/example")
async def example_api_endpoint() -> Any:
    return {"data": "example api endpoint"}
