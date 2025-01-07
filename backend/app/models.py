from collections import OrderedDict
from enum import Enum
from typing import Optional
from uuid import UUID
from sqlmodel import Field, SQLModel, JSON, Relationship


class FruitTypeEnum(str, Enum):
    ZOAN = "Zoan"
    LOGIA = "Logia"
    PARAMECIA = "Paramecia"
    MYTHICAL_ZOAN = "Mythical Zoan"


class RomanizedName(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    is_spoiler: bool = False

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")
    devil_fruit: "DevilFruit" = Relationship(back_populates="romanized_names")


class TranslatedName(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    is_spoiler: bool = False

    fruit_id: UUID = Field(foreign_key="devilfruit.fruit_id")
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

    romanized_names: list["RomanizedName"] = Relationship(back_populates="devil_fruit")
    translated_names: list["TranslatedName"] = Relationship(
        back_populates="devil_fruit"
    )
    types: list["FruitTypeAssociation"] = Relationship(back_populates="devil_fruit")

    ability: str
    awakened_ability: Optional[str] = None

    users: list["User"] = Relationship(back_populates="devil_fruit")

    is_canon: bool = True


class DevilFruitSimple(SQLModel):
    fruit_id: Optional[UUID] = None
    names: Optional[dict] = None
    types: Optional[set] = None
    ability: Optional[str] = None
    awakened_ability: Optional[str] = None
    users: Optional[dict] = None
    is_canon: Optional[bool] = None

    @classmethod
    def from_devil_fruit(
        cls,
        df: "DevilFruit",
        include_metadata: bool = True,
        include_names: bool = True,
        include_abilites: bool = True,
        include_user: bool = True,
        include_type: bool = True,
    ) -> "DevilFruitSimple":
        """
        Convert a DevilFruit instance to DevilFruitSimple

        Args:
            df: DevilFruit instance
            include_names: include romanized and translated names
            include_ability: include ability and awakened ability
            include_type: include fruit type
            inlcude_metadata: include is canon and is spoiler
        """
        result: "DevilFruitSimple" = {}

        if include_metadata:
            result["fruit_id"] = df.fruit_id
            result["is_canon"] = df.is_canon

        if include_names:
            result["names"] = {
                "primary_name": (
                    df.romanized_names[0].name if df.romanized_names else None
                ),
                "localized_name": (
                    df.translated_names[0].name if df.translated_names else None
                ),
            }

        if include_type:
            result["types"] = {ta.type for ta in df.types}

        if include_abilites:
            result["ability"] = df.ability
            result["awakened_ability"] = df.awakened_ability

        if include_user:
            result["users"] = {
                "current_user": next((u.user for u in df.users if u.is_current), None)
            }

        # TODO: Figure out a way for the response to be in ordered in a specific way
        # sorted_result = cls.sort_fields(result)

        return cls(**result)


# pydantic models
class RomanizedNameRead(SQLModel):
    name: str
    is_spoiler: bool


class TranslatedNameRead(SQLModel):
    name: str
    is_spoiler: bool


class FruitTypeRead(SQLModel):
    type: str
    is_spoiler: bool


class UserAwakeningRead(SQLModel):
    is_awakened: bool = False
    is_spoiler: bool = False


class UserRead(SQLModel):
    user: str
    is_artificial: bool
    is_current: bool
    is_spoiler: bool

    awakening: Optional[UserAwakeningRead] = None


class DevilFruitRead(SQLModel):
    fruit_id: UUID

    romanized_names: list[RomanizedNameRead] = []
    translated_names: list[TranslatedNameRead] = []
    types: list[FruitTypeRead] = []

    ability: str
    awakened_ability: Optional[str] = None

    users: list[UserRead] = []

    is_canon: bool = True


# relationship models
