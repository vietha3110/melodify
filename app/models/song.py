from .db import db
from datetime import datetime


class Song(db.Model): 
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    artist_id = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String, nullable=False)
    length = db.Column(db.Integer, nullable=False) 
    user_id = db.Column(db.Integer, nullable=False)
    audio_file = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self): 
        return {
            'id': self.id,
            'name': self.name, 
            'artistId': self.artist_id, 
            'userId': self.user_id, 
            'audioFile': self.audio_file,
            'length': self.length
        }
