from datetime import datetime

from sqlalchemy import Boolean, CheckConstraint, DateTime, Enum, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base
from models.enums import ExperienceLevel, PreferredTrack, StudyYearCategory


class Registration(Base):
    __tablename__ = "registrations"

    __table_args__ = (
        CheckConstraint(
            "current_year IN ('freshman', 'sophomore', 'junior', 'senior')",
            name="ck_registrations_current_year_values",
        ),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone_number: Mapped[str] = mapped_column(String(50), nullable=False)
    telegram_username: Mapped[str | None] = mapped_column(String(100), nullable=True)
    github_profile: Mapped[str | None] = mapped_column(String(255), nullable=True)
    linkedin_profile: Mapped[str | None] = mapped_column(String(255), nullable=True)
    university_name: Mapped[str] = mapped_column(String(255), nullable=False)
    current_year: Mapped[StudyYearCategory] = mapped_column(String(20), nullable=False)
    department: Mapped[str] = mapped_column(String(255), nullable=False)
    preferred_track: Mapped[PreferredTrack] = mapped_column(
        Enum(PreferredTrack, name="preferred_track"),
        nullable=False,
    )
    prior_experience: Mapped[ExperienceLevel] = mapped_column(
        Enum(ExperienceLevel, name="experience_level"),
        nullable=False,
    )
    availability: Mapped[bool] = mapped_column(Boolean, nullable=False)
    why_join: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
