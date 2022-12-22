const deepcopy = require('deepcopy');

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

export const fetchAll = () => async dispatch => {
    const response = await fetch(`/api/playlists/all`); 
    if (response.ok) {
        const data = await response.json();
        dispatch(loadAll(data.playlists)); 
        return response
    }
}

export const fetchUserList = () => async dispatch => {
    const response = await fetch(`/api/playlists/current`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserPlaylists(data.playlists));
        return response;
    }
}

export const makePlaylist = (playlist) => async dispatch => {
    const { name, description } = playlist;
    try {
        const response = await fetch(`/api/playlists/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(addPlaylist(data));
            return data;
        } else {
            const data = await response.json();
            if (data) {
                throw data.error.name;
            } else {
                throw ['An error occured. Please try again'];
            }
        }
    } catch (err) {
        throw (err);
    }
}

export const updatePlaylist = (playlist) => async dispatch => {
    const { id,name, description } = playlist;
    try {
        const response = await fetch(`api/playlists/id`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(updatePlaylist(data));
            return data;
        } else {
            const data = await response.json();
            if (data) {
                throw data.error.message;
            }
        }
    } catch (err) {
        throw(err)
    }
}


export const deletePlaylist = (playlistId) => async dispatch => {
    try {
        const response = await fetch(`/api/playlists/${playlistId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            dispatch(removePlaylist(playlistId));
            const data = response.json(); 
            return data;
        } else {
            const data = await response.json();
            if (data) {
                throw data.error.message;
            }
        }
        
    } catch (err) {
        throw err;
    }
}

const playlistReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USERPLAYLISTS:
            newState = deepcopy(state);
            let newList = action.playlists.reduce((data, list) => {
                data[list.id] = list;
                return data;
            }, {});
            newState.playlists = newList;
            return newState;
        case ADD_PLAYLIST:
            newState = deepcopy(state);
            newState.playlists[action.playlist.id] = action.playlist;
            return newState;
        
        case EDIT_PLAYLIST:
            newState = deepcopy(state);
            const playlist = action.playlist;
            newState.playlists[playlist.id] = playlist;
            return newState;
            
        case REMOVE_PLAYLIST:
            newState = deepcopy(state);
            delete newState.playlists[action.playlistId];
            return newState;
    
        default:
            return state
    }
}

export default playlistReducer;
