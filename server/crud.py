from sqlalchemy.orm import Session
from . import models, schemas

# function to create a new event
def create_event(db: Session, event: schemas.EventCreate):
    db_event = models.Event(
        title=event.title,
        description=event.description,
        start=event.start,
        end=event.end
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

# function to get all events
def get_events(db: Session):
    return db.query(models.Event).all()

# function to get a single event by id
def get_event(db: Session, event_id: int):
    return db.query(models.Event).filter(models.Event.id == event_id).first()

# function to update an event
def update_event(db: Session, event: schemas.EventUpdate, event_id: int):
    db_event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if db_event:
        db_event.title = event.title
        db_event.description = event.description
        db_event.start = event.start
        db_event.end = event.end
        db.commit()
        db.refresh(db_event)
        
# function to delete an event
def delete_event(db: Session, event_id: int):
    db_event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if db_event:
        db.delete(db_event)
        db.commit()
        return db_event
