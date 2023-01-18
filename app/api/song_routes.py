from flask import Blueprint, jsonify, request, make_response, send_file
from flask import jsonify
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
    audio_file = request.json['audioFile']
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate(): 
        try:
            print('!!!! data=', audio_file, len(audio_file))
            data = audio_file
            data = bytearray(data)
            data = bytes(data)
            fileBytes = data
            new_file = File(
                file_song = fileBytes
            )
            db.session.add(new_file)
            db.session.commit()
            new_song = Song(
                name = form.data['name'], 
                artist_name = form.data['artist_name'],
                genre = form.data['genre'],
                length = form.data['length'],
                user_id = current_user_id,
                file_id = new_file.id 
            )
            db.session.add(new_song)
            db.session.commit()
            return new_song.to_dict(), 201
        except Exception as exception:
            exception.print_exc()
            return {'error': 'there is an error, please try again'}, 500
    if form.errors:
        return {'error': form.errors}, 400

@song_routes.route('/file/<int:id>')
def get_file(id):
    try: 
        file = File.query.get(id)
        if file: 
            response = make_response(file.file_song)
            response.headers['Content-Type'] = 'audio/mpeg'
            return response
        else: 
            return {
                'error': {
                    'message': 'Can not find song',
                    'statusCode': 404
                }
            }, 404
    except Exception as exception:
        return {'error': 'there is an error, please try again'}, 500



@song_routes.route('/<int:song_id>', methods=['DELETE'])
@login_required
def delete_song(song_id): 
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    delete_song = Song.query.get(song_id)
    if delete_song: 
        if delete_song.user_id == current_user_id: 
            db.session.delete(delete_song)
            db.session.commit()
            return {
                'message': 'Successfully delete'
            }
        else: 
            return {
                'error': {
                    'message': 'Forbidden',
                    'statusCode': 403
                }
            }, 403
    else: 
        return {
            'error': {
                'message': 'Can not find song',
                'statusCode': 404
            }
        }

@song_routes.route('/<int:song_id>', methods=['GET'])
def get_songinfo(song_id): 
    print('*******************************',song_id)
    song_info = Song.query.get(song_id)

    if song_info: 
        print('return')
        return song_info.to_dict(), 201
    else: 
        return {
                'error': {
                    'message': 'Can not find song',
                    'statusCode': 404
                }
            }, 404

@song_routes.route('/search/<string:keyword>')
def search_music(keyword): 
    result = [{'song': item.name, 'artist': item.artist_name, 'id': item.id} for item in Song.query.filter(Song.name.ilike(f'%{keyword}%') | Song.artist_name.ilike(
    f'%{keyword}%')).order_by(Song.name.startswith(keyword), Song.artist_name.startswith(keyword)).limit(10)]
    return jsonify(result)
