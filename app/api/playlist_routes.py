from flask import Blueprint, jsonify, request, make_response
from flask_login import login_required, current_user
from ..models import db, Playlist
from ..forms import PlaylistForm

playlist_routes = Blueprint('playlists', __name__)

# @playlist_routes.route('/files/<file_name>', methods = ['POST'])
# def upload(file_name): 
#     fo = open('files/' + file_name, 'wb')
#     fo.write(request.get_data())
#     return {}, 200


# @playlist_routes.route('/files/<file_name>')
# def file(file_name):
#     content = open('files/' + file_name, "r").read()
#     response = make_response(content)
#     response.headers.set('Content-Type', 'application/octet-stream')
#     return response

@playlist_routes.route('/all')
def get_all(): 
    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}, 200

@playlist_routes.route('/current')
@login_required
def user_playlists(): 
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    """
    Query for all user_playlists and returns them in a list of user_playlist dictionaries
    """
    user_playlists = Playlist.query.filter(Playlist.user_id == current_user_id ).all()
    return {'playlists': [playlist.to_dict() for playlist in user_playlists]}, 200 

@playlist_routes.route('/', methods=['POST'])
@login_required
def create_playlist():
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        try:
            new_playlist = Playlist(
                name = form.data['name'],
                description = form.data['description'],
                user_id = current_user_id
            )
            db.session.add(new_playlist)
            db.session.commit()
            return new_playlist.to_dict(), 201
        except Exception:
            return {'error': 'there is an error, please try again'}, 500
    if form.errors:
        return {'error': form.errors}, 400

@playlist_routes.route('/<int:playlist_id>', methods=['PUT'])
@login_required
def update_playlist(playlist_id): 
    print('Im runnign')
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    update_playlist = Playlist.query.get(playlist_id)
    if update_playlist: 
        if update_playlist.user_id == current_user_id: 
            data = request.get_json()
            if data['name'].isspace() or not data['name']: 
                return {
                    'error': "Name can not be blank.",
                    "statusCode": 400
                }, 400
            update_playlist.name = data['name']
            update_playlist.description = data['description']
            db.session.commit()
            return update_playlist.to_dict(), 200
        else:
            return {'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }}, 403
    else:
        return {'error': {
            'message': 'Can not find playlist',
            'statusCode': 404
        }}, 404 

@playlist_routes.route('/<int:playlist_id>', methods=['DELETE'])
@login_required
def delete_playlist(playlist_id):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    delete_playlist = Playlist.query.get(playlist_id)
    if delete_playlist: 
        if delete_playlist.user_id == current_user_id: 
            db.session.delete(delete_playlist)
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
                'message': 'Can not find playlist',
                'statusCode': 404
            }
        }, 404
