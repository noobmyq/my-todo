'''
Date: 2021-12-21 17:45:56
LastEditTime: 2021-12-22 15:32:25
FilePath: /new-simple-todo/my-todo/backend/mytodo/apis.py
'''
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# # add origins
# origins = [
#     # "http://localhost:3000",
#     "*"
# ]

# # middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


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


# get todo items
@app.get("/todo/", tags=["todo"], response_model=List[schemas.Item])
def get_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items


# @app.post("/clear/", tags=["clear"])
# async def clear_items():
#     todos.clear()
#     return{"data": "Clear"}

# post todo items


@app.post("/todo/", tags=["todos"], response_model=schemas.Item)
async def add_todo(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    # todos.append(jsonable_encoder(todo))
    # return{
    #     "data": {"Todo added."}
    # }
    print(item)
    crud.create_item(db=db, item=item)
    return{"data": "Todo added"}
