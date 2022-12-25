from .db import db
from datetime import datetime


class Song(db.Model): 
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    artist_name = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    length = db.Column(db.Integer, nullable=False) 
    user_id = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    file_id = db.Column(db.Integer, db.ForeignKey("files.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='songs')
    playlist_songs = db.relationship('Playlist_Song', back_populates='song', cascade="all, delete-orphan")
    file = db.relationship('File', back_populates='song', uselist=False, cascade="all, delete")

    def to_dict(self): 
        return {
            'id': self.id,
            'name': self.name, 
            'artistName': self.artist_name, 
            'userId': self.user_id, 
            'audioFile': self.file,
            'length': self.length
        }
