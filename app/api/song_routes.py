from flask import Blueprint, jsonify, request, make_response
from flask_login import login_required, current_user
from ..models import db, Song, File


song_routes = Blueprint('songs', __name__) 


@song_routes.route('/all')
def get_all_songs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}, 200

@song_routes.route('/current') 
def user_songs(): 
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']

    user_songs = Song.query.filter(Song.user_id == current_user_id).all()
    return {'songs': [song.to_dict() for song in user_songs]}, 200

@song_routes.route('/', methods=['POST'])
@login_required
def upload_song(): 
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
