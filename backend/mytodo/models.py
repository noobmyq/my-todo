'''
Date: 2021-12-22 12:51:45
LastEditTime: 2021-12-25 16:16:17
FilePath: /new-simple-todo/my-todo/backend/mytodo/models.py
'''

from typing import Optional
from sqlalchemy.sql.expression import true
from sqlmodel import SQLModel, Field
from enum import IntEnum


class TodoStatus(IntEnum):
    TODO = 0
    DONE = 1
    EXPIRED = 2


class ItemBase(SQLModel):
    content: str
    status: TodoStatus
    expire_date: str
    title: str
    priority: int


class ItemCreate(ItemBase):
    pass


class Item(ItemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class ItemUpdate(SQLModel):
    content: str
    status: TodoStatus
    expire_date: str
    title: str
    priority: int
