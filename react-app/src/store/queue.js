const ADD_SONG = "queue/addSong";


export function addSong(song) {
    return {
        type: ADD_SONG,
        song
    }
}


const queueReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD_SONG:
            newState = deepCopy(state);
            newState.songs[action.song.id] = action.song;
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

export default queueReducer;
