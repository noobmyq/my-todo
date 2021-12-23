'''
Date: 2021-12-22 12:57:13
LastEditTime: 2021-12-23 16:08:23
FilePath: /new-simple-todo/my-todo/backend/mytodo/schemas.py
'''
from typing import List, Optional
from pydantic import BaseModel
from enum import IntEnum


class TodoStatus(IntEnum):
    UNDONE = 0
    DONE = 1
    EXPIRED = 2


class ItemBase(BaseModel):
    content: str
    status: int


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True
    # pass
