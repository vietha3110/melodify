"""new-revision

Revision ID: 829677d27ec7
Revises: 8147f54bc41a
Create Date: 2022-12-25 14:16:13.475776

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '829677d27ec7'
down_revision = '8147f54bc41a'
branch_labels = None
depends_on = None


def upgrade():  
    op.create_table('files', 
    sa.Column('id', sa.Integer(), nullable=False), 
    sa.Column('file_song', sa.LargeBinary, nullable=False), 
    sa.PrimaryKeyConstraint('id')
    )

    with op.batch_alter_table("songs") as batch_op:
        batch_op.add_column(sa.Column('file_id', sa.Integer(), nullable=False))
        batch_op.drop_column('audio_file')
    
    op.create_foreign_key('fk_file', 'songs', 'files', ['file_id'], ['id'])
   
  

def downgrade():
    pass 
    
