from .db import db, environment, SCHEMA, add_prefix_to_prod 
from datetime import datetime 

class Playlist_Song(db.Model):
    __tablename__ = 'playlist_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_to_prod("playlists.id")),nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_to_prod("songs.id")),nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    playlist = db.relationship('Playlist', back_populates='playlist_songs')
    song = db.relationship('Song', back_populates='playlist_songs')

    def to_dict(self): 
        return {
            'id': self.id, 
            'playlistId': self.playlist_id,
            'songId': self.song_id,
        }
    