"""<descriptive message>

Revision ID: 102017f224c5
Revises: 
Create Date: 2023-09-25 06:30:37.606259

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '102017f224c5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=True),
    sa.Column('last_name', sa.String(length=50), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password_hash', sa.String(length=200), nullable=False),
    sa.Column('photo_url', sa.String(length=512), nullable=True),
    sa.Column('birth_date', sa.Date(), nullable=True),
    sa.Column('join_date', sa.Date(), nullable=True),
    sa.Column('last_login', sa.Date(), nullable=True),
    sa.Column('privacy_settings', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
