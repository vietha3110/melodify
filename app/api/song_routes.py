from flask import Blueprint, jsonify, request, make_response
from flask_login import login_required, current_user
from ..models import db, Song, File
from ..forms import UploadSongForm


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
    form = UploadSongForm()
    audio_file = form['audioFile']
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate(): 
        try: 
            new_file = File(
                file_song = audio_file.read()
            )
            db.session.add(new_file)
            db.session.commit()
            new_song = Song(
                name = form['name'], 
                artist_name = form['artist_name'],
                genre = form['genre'],
                length = form['length'],
                user_id = current_user_id,
                file_id = new_file.id 
            )
            db.session.add(new_song)
            db.session.commit()
            return new_song.to_dict(), 201
        except Exception:
            return {'error': 'there is an error, please try again'}, 500
    if form.errors: 
        return {'error': form.erros}, 400
