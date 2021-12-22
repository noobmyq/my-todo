'''
Date: 2021-12-22 13:02:22
LastEditTime: 2021-12-22 20:22:40
FilePath: /new-simple-todo/my-todo/backend/mytodo/crud.py
'''
from sqlalchemy.orm import Session

from . import models, schemas


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_item(db: Session, item: schemas.ItemCreate, id: int):
    db_item = models.Item(**item.dict(), id=id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_items_num(db: Session):
    return db.query(models.Item).count()


def delete_item(db: Session, item_id: int):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
        db.flush()
        return db_item


def clear_item(db: Session):
    a = get_items_num(db)
    for i in range(0, a+1):
        print(i)
        delete_item(db, i)
    return get_items_num(db)
