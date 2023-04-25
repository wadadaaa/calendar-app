from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, validator
from uuid import uuid4

app = FastAPI()

# Dummy database
db = []

# CORS settings
origins = ["https://calendar-app-inky.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Event(BaseModel):
    id: str = str(uuid4())
    title: str
    description: str
    start: datetime
    end: datetime
    response: Optional[str] = None

    @validator('start', 'end', pre=True)
    def parse_datetime(cls, value):
        if isinstance(value, str):
            return datetime.fromisoformat(value)
        return value

# Routes
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/events", response_model=List[Event])
def get_events():
    return db

@app.post("/events", response_model=Event)
def create_event(event: Event):
    event_dict = event.dict()
    event_dict["id"] = str(len(db) + 1)
    db.append(event_dict)
    return event_dict


@app.put("/events/{id}", response_model=Event)
def update_event(id: str, event: Event):
    for i, e in enumerate(db):
        if e["id"] == id:
            db[i] = event.dict()
            db[i]["id"] = id
            return db[i]

@app.delete("/events/{id}", response_model=Event)
def delete_event(id: str):
    for i, e in enumerate(db):
        if e["id"] == id:
            del db[i]
            return e
