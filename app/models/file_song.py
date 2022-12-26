from .db import db
from datetime import datetime

class File(db.Model):
    __tablename__ = 'files' 

    id = db.Column(db.Integer, primary_key=True)
    file_song = db.Column(db.LargeBinary, nullable=False)

    song = db.relationship('Song', back_populates='file', uselist=False)

    