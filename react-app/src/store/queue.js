import * as playerAction from "./player";

const UPDATE_LIST = "queue/updateList"; 
const NEXT_SONG = "queue/nextSong"; 
const PREVIOUS_SONG = "queue/previousSong";
const PLAY_SONG_FROM_LIST = "queue/playSong"

export function updateList(playlist) {
    return {
        type: UPDATE_LIST, 
        playlist
    }
}

export function nextSong() {
    return {
        type: NEXT_SONG
    }
}

export function previousSong() {
    return {
        type: PREVIOUS_SONG
    }
}

export const playSong = (song) => async(dispatch) => {
    dispatch(playerAction.loadSong(song.id));
    dispatch({
        type: PLAY_SONG_FROM_LIST, 
        song
    })
}

const initialState = {
    list: null,
    currentPlayingSong: null,
    repeated: false
}

const queueReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LIST: 
            return {
                list: action.playlist,
                currentPlayingSong: action.playlist[0],
                repeated: false
            }
        case NEXT_SONG: 
            return {
                ...state, 
                // currentPlayingSong: action.playlist
            }
        case PREVIOUS_SONG: 
            return {
                ...state, 

            }
        case PLAY_SONG_FROM_LIST: 
            return {
                ...state, 
                currentPlayingSong: action.song
            }
    }
}

export default queueReducer;
