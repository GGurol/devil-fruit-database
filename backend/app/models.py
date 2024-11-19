from typing import Optional, List
from sqlmodel import Field, SQLModel, JSON, Relationship

class DevilFruitBase(SQLModel):
  fruit_id: str = Field(primary_key=True)
  names: dict = Field(sa_column=JSON)
  types: List[dict] = Field(sa_column=JSON)
  abilities: dict = Field(sa_column=JSON)
  users: dict = Field(sa_column=JSON)
  is_canon: bool

class DevilFruit(DevilFruitBase, table=True):
  __tablename__ = "devil_fruits"


