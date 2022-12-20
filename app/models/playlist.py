from .db import db
from datetime import datetime


class Playlist(db.Model):
    __tablename__ = 'playlists' 

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100),nullable=False)
    description = db.Column(db.String(200), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='playlists')
    playlist_songs = db.relationship('Playlist_Song', back_populates='playlist', cascade="all, delete-orphan")

    def to_dict(self): 
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description, 
            'playlist_songs': [[playlist_song.to_dict() for playlist_song in self.playlist_songs]]
        }
