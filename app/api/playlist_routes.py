from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Playlist


playlist_routes = Blueprint('playlists', __name__)

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
    