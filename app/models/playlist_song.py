from .db import db
from datetime import datetime 

class Playlist_Song(db.Model):
    __tablename__ = 'playlist_songs'

    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey("playlists.id"),nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"),nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    playlist = db.relationship('Playlist', back_populates='playlist_songs')
    song = db.relationship('Song', back_populates='playlist_songs')

    def to_dict(self): 
        return {
            'id': self.id, 
            'playlistId': self.playlist_id,
            'songId': self.song_id,
            'song': self.song.to_dict()
        }
    