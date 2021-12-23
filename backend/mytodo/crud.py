'''
Date: 2021-12-22 13:02:22
LastEditTime: 2021-12-23 16:58:38
FilePath: /new-simple-todo/my-todo/backend/mytodo/crud.py
'''
from sqlalchemy.orm import Session, query

from . import models, schemas


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_item(db: Session, item: schemas.ItemCreate, id: int):
    db_item = models.Item(**item.dict(), id=id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def add_done_item(db: Session, item_id: int):
    db_item: models.Item = db.query(models.Item).filter(
        models.Item.id == item_id).first()
    db_item.status = 1
    db.commit()
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
    while a != 0:
        item = db.query(models.Item).first()
        id = item.id
        delete_item(db, item_id=id)
        a = get_items_num(db)
    return get_items_num(db)


def get_current_id(db: Session):
    max = -1
    for i in range(0, get_items_num(db)):
        item = db.query(models.Item).all()[i]
        if int(item.id) > max:
            max = int(item.id)
    return max+1
