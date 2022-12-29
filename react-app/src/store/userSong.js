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
