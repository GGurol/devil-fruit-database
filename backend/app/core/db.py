from sqlmodel import create_engine, SQLModel, Session

# TEMP 
DATABASE_URL = "postgresql://postgres:0000@localhost/hero_db"

# TODO: remove echo for prod, just for testing and learning purposes 
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
  SQLModel.metadata.create_all(engine)

def get_session():
  with Session(engine) as session:
      yield session