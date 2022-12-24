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
        const response = await fetch(`api/playlists/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(editPlaylist(data));
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
            newState = deepCopy(state);
            let newList = action.playlists.reduce((data, list) => {
                data[list.id] = list;
                return data;
            }, {});
            newState.playlists = newList;
            return newState;
        case ADD_PLAYLIST:
            newState = deepCopy(state);
            newState.playlists[action.playlist.id] = action.playlist;
            return newState;
        
        case EDIT_PLAYLIST:
            newState = deepCopy(state);
            const playlist = action.playlist;
            newState.playlists[playlist.id] = playlist;
            return newState;
            
        case REMOVE_PLAYLIST:
            newState = deepCopy(state);
            delete newState.playlists[action.playlistId];
            return newState;
    
        default:
            return state
    }
}

function deepCopy(value) {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map(element => deepCopy(element));
        } else {
            const result = {};
            Object.entries(value).forEach(entry => {
                result[entry[0]] = deepCopy(entry[1]);
            });
            return result;
        }
    } else {
        return value;
    }
}


export default playlistReducer;
