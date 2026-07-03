"""switch registration current_year to study year category

Revision ID: 4b8f1c2d7a9e
Revises: 9e2a42b541ea
Create Date: 2026-07-03 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "4b8f1c2d7a9e"
down_revision: Union[str, Sequence[str], None] = "9e2a42b541ea"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_constraint("ck_registrations_current_year_range", "registrations", type_="check")
    op.alter_column(
        "registrations",
        "current_year",
        existing_type=sa.Integer(),
        type_=sa.String(length=20),
        existing_nullable=False,
        postgresql_using=(
            "CASE current_year "
            "WHEN 1 THEN 'freshman' "
            "WHEN 2 THEN 'sophomore' "
            "WHEN 3 THEN 'junior' "
            "WHEN 4 THEN 'senior' "
            "WHEN 5 THEN 'senior' "
            "ELSE 'freshman' END"
        ),
    )
    op.create_check_constraint(
        "ck_registrations_current_year_values",
        "registrations",
        "current_year IN ('freshman', 'sophomore', 'junior', 'senior')",
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint("ck_registrations_current_year_values", "registrations", type_="check")
    op.alter_column(
        "registrations",
        "current_year",
        existing_type=sa.String(length=20),
        type_=sa.Integer(),
        existing_nullable=False,
        postgresql_using=(
            "CASE current_year "
            "WHEN 'freshman' THEN 1 "
            "WHEN 'sophomore' THEN 2 "
            "WHEN 'junior' THEN 3 "
            "WHEN 'senior' THEN 4 "
            "ELSE 1 END"
        ),
    )
    op.create_check_constraint(
        "ck_registrations_current_year_range",
        "registrations",
        "current_year >= 1 AND current_year <= 5",
    )