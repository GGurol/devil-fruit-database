from enum import Enum
from typing import Dict


class Environment(str, Enum):
    DEV = "dev"
    STAGING = "staging"
    PROD = "prod"

    @property
    def is_prod(self) -> bool:
        return self == self.PROD

    @property
    def is_dev(self) -> bool:
        return self == self.DEV


DATA_FILES: Dict[Environment, str] = {
    Environment.DEV: "data/dfa-devil_fruits.json",
    Environment.STAGING: "data/simple_data.json",
    Environment.PROD: "data/simple_data.json",
}
