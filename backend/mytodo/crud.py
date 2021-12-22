'''
Date: 2021-12-22 13:02:22
LastEditTime: 2021-12-22 15:41:19
FilePath: /new-simple-todo/my-todo/backend/mytodo/crud.py
'''
from sqlalchemy.orm import Session

from . import models, schemas


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict(), id=9)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
