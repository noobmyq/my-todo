'''
Date: 2021-12-20 15:28:20
LastEditTime: 2021-12-23 19:12:39
FilePath: /new-simple-todo/my-todo/backend/mytodo/database.py
'''
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
SQLALCHEMY_DATABASE_URL = "sqlite:///./todo.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}, echo=True
)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
