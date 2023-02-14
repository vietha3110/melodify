import * as playerAction from "./player";

const UPDATE_LIST = "queue/updateList"; 
const NEXT_SONG = "queue/nextSong"; 
const PREVIOUS_SONG = "queue/previousSong";
const PLAY_SONG_FROM_LIST = "queue/playSong";
const DELETE_SONG = "queue/deleteSong";
const REPEAT_LIST = "queue/repeatList";
const SHUFFLE_LIST = "queue/shuffleList";

function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
// accessing state in action creators - use GetState in thunks (Redux Thunk middleware )
export const updateList = (playlist) => async (dispatch, getState) => {
    const isShuffled = getState().queue.shuffled; 
    if (playlist.list.length === 0) {
        dispatch(playerAction.reset());
    } else if (isShuffled) {
        playlist.list = shuffleArr(playlist.list);
        dispatch(playerAction.loadSong(playlist.list[0]));
        dispatch({
            type: UPDATE_LIST,
            playlist,
        });
    }
    else {
        dispatch({
            type: UPDATE_LIST,
            playlist,
        });
        dispatch(playerAction.loadSong(playlist.list[0]));
    }
}

export const nextSong = () => async (dispatch, getState) => {
    const state = getState().queue;

    if (state.list === null) {
        return;
    }

    if (state.currentPlayingSong === state.list.length - 1 && state.repeated === true) {
        dispatch(updateList(state));
        return;
    } else if (state.currentPlayingSong === state.list.length - 1 && state.repeated === false) {
        return;
    } else {
        const nextSongId = (state.currentPlayingSong + 1) % state.list.length;
        dispatch({
            type: NEXT_SONG,
            nextSongId: nextSongId
        });
        dispatch(playerAction.loadSong(state.list[nextSongId]));
    }
}

export const previousSong = () => async (dispatch, getState) => {
    const state = getState().queue;
   
    if (state.currentPlayingSong === 0) {
        return;
    }
    const previousSongId = (state.currentPlayingSong - 1) % state.list.length;
    
    dispatch({
        type: PREVIOUS_SONG,
        previousSongId
    });
    dispatch(playerAction.loadSong(state.list[previousSongId]));
}

export const playSong = (index) => async (dispatch, getState) => {
    const song = getState().queue.list[index];
    dispatch(playerAction.loadSong(song));
    dispatch({
        type: PLAY_SONG_FROM_LIST, 
        index
    })
}

export const deleteSong = (songId) => async (dispatch, getState) => {
    const { list, currentPlayingSong } = getState().queue; 
    if (currentPlayingSong === list.length - 1 && list[currentPlayingSong].id === songId) {
        dispatch(playerAction.reset());
        list.splice(currentPlayingSong, 1);
        dispatch({
            type: DELETE_SONG,
            playlist: null
        });
        return;
    }
    if (currentPlayingSong === 0 && list[currentPlayingSong].id === songId) {
        let nextSongId = 1;
        dispatch(playerAction.loadSong(list[nextSongId]));
        list.splice(currentPlayingSong, 1);
        dispatch({
            type: DELETE_SONG, 
            playlist: list
        })
    }
    for (let song of list) {
        if (song.id === songId) {
            let newList = list.filter(song => song.id !== songId);
            dispatch({
                type: DELETE_SONG, 
                playlist: newList
            });
        } 
    }
}

export const repeatList = (repeat) => {
    return({
        type: REPEAT_LIST, 
        repeated: repeat
    })
}


export const shuffleList = (shuffle) => async (dispatch, getState) => {
    const state = getState().queue;
    const playing = getState().player.playing;
    const isShuffled = shuffle;

    if (isShuffled && playing) {
        state.shuffled = isShuffled;
        state.list = shuffleArr(state.list)
        dispatch(updateList(state));
        return;
    } else {
        dispatch(updateShuffled(isShuffled))
    }
}

export const updateShuffled = (shuffled) => {
    return (
        {
            type: SHUFFLE_LIST,
            isShuffled:shuffled
        })
}


const initialState = {
    list: null,
    currentPlayingSong: 0,
    repeated: false,
    listId: null,
    shuffled: false
}

const queueReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LIST: 
            return {
                list: action.playlist.list,
                currentPlayingSong: 0,
                repeated: false,
                listId: action.playlist.listId,
                shuffled: action.playlist.shuffled
            }
        case NEXT_SONG: 
            return {
                ...state, 
                currentPlayingSong: action.nextSongId,
            }
        case PREVIOUS_SONG: 
            return {
                ...state, 
                currentPlayingSong: action.previousSongId,
            }
        case PLAY_SONG_FROM_LIST: 
            return {
                ...state, 
                currentPlayingSong: action.index
            }
        case DELETE_SONG: 
            return {
                ...state,
                list: action.playlist
            }
        case REPEAT_LIST: 
            return {
                ...state, 
                repeated: action.repeated
            }
        case SHUFFLE_LIST: 
            return {
                ...state,
                shuffled: action.isShuffled
            }

        default:
            return state;
    }
}

export default queueReducer;
