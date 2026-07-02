from fastapi import APIRouter, Depends, status
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.orm import Session

from db import get_db
from models.enums import ExperienceLevel, PreferredTrack
from models.registration import Registration

router = APIRouter(prefix="/applications", tags=["applications"])


class ApplicationCreate(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=200, description="Student full name")
    email: str = Field(..., min_length=3, max_length=255, pattern=r"^[^\s@]+@[^\s@]+\.[^\s@]+$", description="Student email address")
    phone_number: str = Field(..., min_length=3, max_length=50, description="Student phone number")
    telegram_username: str = Field(..., min_length=1, max_length=100, description="Telegram username")
    github_profile: str | None = Field(default=None, max_length=255, description="GitHub profile URL")
    linkedin_profile: str | None = Field(default=None, max_length=255, description="LinkedIn profile URL")
    university_name: str = Field(..., min_length=1, max_length=255, description="University name")
    current_year: int = Field(..., ge=1, le=5, description="Current study year from 1 to 5")
    department: str = Field(..., min_length=1, max_length=255, description="Department")
    preferred_track: PreferredTrack = Field(..., description="Preferred track")
    prior_experience: ExperienceLevel = Field(..., description="Prior experience level")
    availability: bool = Field(..., description="Availability status")
    why_join: str = Field(..., min_length=1, description="Why the student wants to join")


class ApplicationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: str
    phone_number: str
    telegram_username: str | None
    github_profile: str | None
    linkedin_profile: str | None
    university_name: str
    current_year: int
    department: str
    preferred_track: PreferredTrack
    prior_experience: ExperienceLevel
    availability: bool
    why_join: str


@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def submit_application(payload: ApplicationCreate, db: Session = Depends(get_db)):
    application = Registration(
        full_name=payload.full_name,
        email=payload.email,
        phone_number=payload.phone_number,
        telegram_username=payload.telegram_username,
        github_profile=payload.github_profile,
        linkedin_profile=payload.linkedin_profile,
        university_name=payload.university_name,
        current_year=payload.current_year,
        department=payload.department,
        preferred_track=payload.preferred_track,
        prior_experience=payload.prior_experience,
        availability=payload.availability,
        why_join=payload.why_join,
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return application