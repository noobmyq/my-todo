'''
Date: 2021-12-22 12:51:45
LastEditTime: 2021-12-23 20:02:46
FilePath: /new-simple-todo/my-todo/backend/mytodo/models.py
'''
from typing import Optional
from sqlalchemy.sql.expression import true
from sqlmodel import SQLModel, Field


class ItemBase(SQLModel):
    content: str
    status: int


class ItemCreate(ItemBase):
    pass


class Item(ItemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class ItemUpdate(SQLModel):
    content: str
    status: int
