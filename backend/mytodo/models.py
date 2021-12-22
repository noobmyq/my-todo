'''
Date: 2021-12-22 12:51:45
LastEditTime: 2021-12-22 22:23:50
FilePath: /new-simple-todo/my-todo/backend/mytodo/models.py
'''
from enum import unique
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.sql.expression import true


from .database import Base
from .schemas import TodoStatus


class Item(Base):
    __tablename__ = "todo"

    id = Column(Integer, primary_key=True, index=True)
    # status = Column(Integer, index=True)
    content = Column(String, index=True)
