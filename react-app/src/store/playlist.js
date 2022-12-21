const LOAD_ALL = 'playlist/loadAll';
const LOAD_USERPLAYLISTS = 'playlist/loadUserPlaylists'; 
const ADD_PLAYLIST = 'playlist/addPlaylist';
const REMOVE_PLAYLIST = 'playlist/removePlaylist';
const EDIT_PLAYLIST = 'playlist/editPlaylist';
const ADD_SONG = 'playlist/addSong'; 
const REMOVE_SONG = 'playlist/removeSong';

export function loadAll(playlists) {
    return {
        type: LOAD_ALL,
        playlists
    }
}

export function loadUserPlaylists(playlists) {
    return {
        type: LOAD_USERPLAYLISTS,
        playlists
    }
}

export function addPlaylist(playlist) {
    return {
        type: ADD_PLAYLIST,
        playlist
    }
}

export function removePlaylist(playlistId) {
    return {
        type: REMOVE_PLAYLIST,
        playlistId
    }
}

export function editPlaylist(playlist) {
    return {
        type: EDIT_PLAYLIST, 
        playlist
    }
}
