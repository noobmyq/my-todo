'''
Date: 2021-12-22 12:51:45
LastEditTime: 2021-12-22 15:34:00
FilePath: /new-simple-todo/my-todo/backend/mytodo/models.py
'''
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String


from .database import Base


class Item(Base):
    __tablename__ = "todo"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, index=True)
