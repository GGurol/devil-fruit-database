from enum import Enum
from typing import Optional, List
from uuid import UUID
from sqlmodel import Field, SQLModel, JSON, Relationship


class FruitTypeEnum(str, Enum):
    ZOAN = "Zoan"
    LOGIA = "Logia"
    PARAMECIA = "Paramecia"


class NameBase(SQLModel):
    name: str
    is_spoiler: bool = False

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")


class RomanizedName(NameBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    devil_fruit: "DevilFruit" = Relationship(back_populates="romanized_names")


class TranslatedName(NameBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    devil_fruit: "DevilFruit" = Relationship(back_populates="translated_names")


class FruitTypeAssociation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    type: str
    is_spoiler: bool = False

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")
    devil_fruit: "DevilFruit" = Relationship(back_populates="types")


class UserAwakening(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    is_awakened: bool = False
    is_spoiler: bool = False

    user_id: int = Field(foreign_key="user.id")
    user: "User" = Relationship(back_populates="awakening")


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: str
    is_artificial: bool = False
    is_current: bool = False
    is_spoiler: bool = False

    awakening: Optional["UserAwakening"] = Relationship(back_populates="user")

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")
    devil_fruit: "DevilFruit" = Relationship(back_populates="users")


class DevilFruit(SQLModel, table=True):
    fruit_id: UUID = Field(default=None, primary_key=True)

    ability: str
    awakened_ability: Optional[str] = None
    is_canon: bool = True

    romanized_names: List["RomanizedName"] = Relationship(back_populates="devil_fruit")
    translated_names: List["TranslatedName"] = Relationship(
        back_populates="devil_fruit"
    )
    types: List["FruitTypeAssociation"] = Relationship(back_populates="devil_fruit")
    users: List["User"] = Relationship(back_populates="devil_fruit")


# pydantic models
# class DevilFruitCreate(DevilFruit):
#     pass


# class DevilFruitUpdate(DevilFruitBase):
#     ability: Optional[str] = None
#     awakened_ability: Optional[str] = None
#     is_canon: Optional[bool] = None


# relationship models
