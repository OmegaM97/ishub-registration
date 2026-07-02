from enum import Enum


class UserRole(str, Enum):
    admin = "admin"
    user = "user"


class PreferredTrack(str, Enum):
    frontend = "Frontend"
    backend = "Backend"
    ai = "AI"
    mobile = "Mobile"


class ExperienceLevel(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
