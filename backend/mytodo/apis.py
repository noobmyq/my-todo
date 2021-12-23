'''
Date: 2021-12-21 17:45:56
LastEditTime: 2021-12-23 20:06:13
FilePath: /new-simple-todo/my-todo/backend/mytodo/apis.py
'''
from sqlmodel import Field, Session, select
from fastapi.middleware.cors import CORSMiddleware
from .database import create_db_and_tables, engine
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException
from . import models


app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


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
# @app.get("/", tags=["root"])
# async def read_root() -> Any:
#     return {"Hello World!"}


# class Item(BaseModel):
#     id: str
#     item: str


# todos = [
#     {
#         "id": "1",
#         "item": "Read a book."
#     },
#     {
#         "id": "2",
#         "item": "Cycle around town."
#     }
# ]

# test
# @app.get("/first/", response_model=schemas.Item)
# def first(db: Session = Depends(get_db)):
#     return crud.create_item(db=db, , id=0)

# get todo items


@app.get("/todo/", tags=["todo"], response_model=List[models.Item])
def get_todos(limit: int = 100):
    with Session(engine) as session:
        items = session.query(models.Item).limit(limit).all()
        return items


# post todo items


@app.post("/todo/", tags=["todos"], response_model=models.Item)
async def add_todo(item: models.ItemCreate):
    with Session(engine) as session:
        db_item = models.Item.from_orm(item)
        session.add(db_item)
        session.commit()
        session.refresh(db_item)
        return db_item


# mark as done
@app.patch("/todo/{item_id}/done", tags=["Done"])
async def mark_as_done(item_id: int):
    with Session(engine) as session:
        db_item = session.get(models.Item, item_id)
        if not db_item:
            raise HTTPException(status_code=404, detail="Item not found")
        db_item.status = 1
        session.add(db_item)
        session.commit()
        session.refresh(db_item)
        return db_item

# update


@app.patch("/todo/{item_id}", tags=["update"])
async def update_item(item_id: int, item: models.ItemUpdate):
    with Session(engine) as session:
        db_item = session.get(models.Item, item_id)
        if not db_item:
            raise HTTPException(status_code=404, detail="Item not found")
        db_item.status = item.status
        db_item.content = item.content
        session.add(db_item)
        session.commit()
        session.refresh(db_item)
        return db_item


# clear all


@app.delete("/clear/", tags=["clear"])
async def clear_items():
    with Session(engine) as session:
        while session.query(models.Item).first() != None:
            firstItem = session.query(models.Item).first()
            session.delete(firstItem)
            print(firstItem)
            session.commit()
        return{"data": "Clear"}


# delete
@app.delete('/items/{item_id}', response_model=models.Item)
def delete_item(item_id: int):
    with Session(engine) as session:
        db_item = session.get(models.Item, item_id)
        if db_item is None:
            raise HTTPException(status_code=404, detail="User not found")
        session.delete(db_item)
        session.commit()
        return db_item
