from enum import Enum


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
