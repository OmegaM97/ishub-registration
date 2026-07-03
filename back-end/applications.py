from io import BytesIO
from datetime import datetime

from fastapi import APIRouter, Depends, Query, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, ConfigDict, Field
from openpyxl import Workbook
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from db import get_db
from auth import get_current_admin
from models.enums import ExperienceLevel, PreferredTrack, StudyYearCategory
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
    current_year: StudyYearCategory = Field(..., description="Current study year category")
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
    current_year: StudyYearCategory
    department: str
    preferred_track: PreferredTrack
    prior_experience: ExperienceLevel
    availability: bool
    why_join: str


class ApplicationListResponse(BaseModel):
    items: list[ApplicationResponse]
    total: int
    page: int
    page_size: int


def build_application_query(
    preferred_track: PreferredTrack | None,
    prior_experience: ExperienceLevel | None,
    availability: bool | None,
    search: str | None,
):
    query = select(Registration)

    if preferred_track is not None:
        query = query.where(Registration.preferred_track == preferred_track)
    if prior_experience is not None:
        query = query.where(Registration.prior_experience == prior_experience)
    if availability is not None:
        query = query.where(Registration.availability == availability)
    if search:
        search_term = f"%{search.strip()}%"
        query = query.where(
            or_(
                Registration.full_name.ilike(search_term),
                Registration.email.ilike(search_term),
                Registration.phone_number.ilike(search_term),
                Registration.telegram_username.ilike(search_term),
                Registration.university_name.ilike(search_term),
                Registration.department.ilike(search_term),
                Registration.why_join.ilike(search_term),
            )
        )

    return query


def to_excel_datetime(value: datetime | None) -> datetime | None:
    if value is None:
        return None
    return value.replace(tzinfo=None) if value.tzinfo is not None else value


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


@router.get("", response_model=ApplicationListResponse)
def list_applications(
    db: Session = Depends(get_db),
    _: object = Depends(get_current_admin),
    preferred_track: PreferredTrack | None = Query(default=None),
    prior_experience: ExperienceLevel | None = Query(default=None),
    availability: bool | None = Query(default=None),
    search: str | None = Query(default=None, min_length=1),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=100),
):
    base_query = build_application_query(preferred_track, prior_experience, availability, search)
    total = db.scalar(select(func.count()).select_from(base_query.subquery())) or 0
    items = db.scalars(
        base_query.order_by(Registration.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    ).all()

    return ApplicationListResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get("/export")
def export_applications(
    db: Session = Depends(get_db),
    _: object = Depends(get_current_admin),
    preferred_track: PreferredTrack | None = Query(default=None),
    prior_experience: ExperienceLevel | None = Query(default=None),
    availability: bool | None = Query(default=None),
    search: str | None = Query(default=None, min_length=1),
):
    query = build_application_query(preferred_track, prior_experience, availability, search)
    items = db.scalars(query.order_by(Registration.created_at.desc())).all()

    workbook = Workbook()
    worksheet = workbook.active
    worksheet.title = "Applications"
    worksheet.append([
        "id",
        "full_name",
        "email",
        "phone_number",
        "telegram_username",
        "github_profile",
        "linkedin_profile",
        "university_name",
        "current_year",
        "department",
        "preferred_track",
        "prior_experience",
        "availability",
        "why_join",
        "created_at",
    ])

    for item in items:
        worksheet.append([
            item.id,
            item.full_name,
            item.email,
            item.phone_number,
            item.telegram_username,
            item.github_profile,
            item.linkedin_profile,
            item.university_name,
            item.current_year,
            item.department,
            item.preferred_track.value,
            item.prior_experience.value,
            item.availability,
            item.why_join,
            to_excel_datetime(item.created_at),
        ])

    buffer = BytesIO()
    workbook.save(buffer)
    buffer.seek(0)

    headers = {
        "Content-Disposition": 'attachment; filename="applications.xlsx"'
    }
    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers=headers,
    )