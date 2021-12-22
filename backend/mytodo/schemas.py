'''
Date: 2021-12-22 12:57:13
LastEditTime: 2021-12-22 15:33:43
FilePath: /new-simple-todo/my-todo/backend/mytodo/schemas.py
'''
from typing import List, Optional
from pydantic import BaseModel


class ItemBase(BaseModel):
    content: str


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True
    # pass
