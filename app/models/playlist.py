from .db import db 
from datetime import datetime


class Playlist(db.Model):
    __tablename__ = 'playlists' 

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100),nullable=False)
    description = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self): 
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description, 
        }
