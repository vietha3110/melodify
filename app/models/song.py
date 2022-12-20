from .db import db, environment, SCHEMA, add_prefix_to_prod
from datetime import datetime


class Song(db.Model): 
    __tablename__ = 'songs'

    if environment == "production": 
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    artist_name = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String, nullable=False)
    length = db.Column(db.Integer, nullable=False) 
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_to_prod("users.id")), nullable=False)
    audio_file = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='songs')
    playlist_songs = db.relationship('Playlist', back_populates='song', cascade="all, delete-orphan")

    def to_dict(self): 
        return {
            'id': self.id,
            'name': self.name, 
            'artistName': self.artist_name, 
            'userId': self.user_id, 
            'audioFile': self.audio_file,
            'length': self.length
        }
