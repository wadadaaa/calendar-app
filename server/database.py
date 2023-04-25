from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

# create the database engine
engine = create_engine('sqlite:///events.db', echo=True)

# create a session factory
Session = sessionmaker(bind=engine)

# create the base class for declarative models
Base = declarative_base()


# define the Event model
class Event(Base):
    __tablename__ = 'events'
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    description = Column(String(500))
    start = Column(DateTime, nullable=False)
    end = Column(DateTime, nullable=False)


# create the events table if it doesn't exist
Base.metadata.create_all(engine)
