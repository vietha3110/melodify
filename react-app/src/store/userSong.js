const LOAD_USERSONGS = 'songs/loadUserSongs';
const REMOVE_SONG = 'songs/removeSong';

export function loadUserSongs(songs) {
    return {
        type: LOAD_USERSONGS,
        songs
    }
}

export function removeSong(songId) {
    return {
        type: REMOVE_SONG, 
        songId
    }
}

export const fetchUserSongs = () => async dispatch => {
    const response = await fetch(`/api/songs/current`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserSongs(data.songs));
        return response;
    }
}

export const deleteSong = (songId) => async dispatch => {
    try {
        const response = await fetch(`/api/songs/${songId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ songId })
        })
        if (response.ok) {
            dispatch(removeSong(songId));
            return response;
        } else {
            const data = response.json();
            return data;
        }
    } catch (err) {
        throw err;
    }
}


const userSongReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USERSONGS: 
            newState = deepCopy(state);
            let newSong = action.songs.reduce((data, song) => {
                data[song.id] = song;
                return data;
            }, {});
            newState.songs = newSong;
            return newState;
        
        case REMOVE_SONG:
            newState = deepCopy(state);
            delete newState.songs[action.songId];
            return newState;

        
        default:
            return state;
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

export default userSongReducer;
