import * as playerAction from "./player";

const UPDATE_LIST = "queue/updateList"; 
const NEXT_SONG = "queue/nextSong"; 
const PREVIOUS_SONG = "queue/previousSong";
const PLAY_SONG_FROM_LIST = "queue/playSong"


// accessing state in action creators - use GetState in thunks (Redux Thunk middleware )
export const updateList = (playlist) => async (dispatch) => {
    dispatch({
        type: UPDATE_LIST,
        playlist,
    });
    dispatch(playerAction.loadSong(playlist[0]));
}

export const nextSong = () => async (dispatch, getState) => {
    const state = getState().queue;
    const nextSongId = (state.currentPlayingSong + 1) % state.list.length;

    dispatch({
        type: NEXT_SONG,
        nextSongId: nextSongId
    });

    dispatch(playerAction.loadSong(state.list[nextSongId]));
}

export function previousSong() {
    return {
        type: PREVIOUS_SONG
    }
}

export const playSong = (songId) => async (dispatch, getState) => {
    const song = getState().queue.list[songId];
    dispatch(playerAction.loadSong(song));
    dispatch({
        type: PLAY_SONG_FROM_LIST, 
        songId
    })
}

const initialState = {
    list: null,
    currentPlayingSong: 0,
    repeated: false
}

const queueReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LIST: 
            return {
                list: action.playlist,
                currentPlayingSong: 0,
                repeated: false
            }
        case NEXT_SONG: 
            return {
                ...state, 
                currentPlayingSong: action.nextSongId,
            }
        // case PREVIOUS_SONG: 
        //     return {
        //         ...state, 

        //     }
        case PLAY_SONG_FROM_LIST: 
            return {
                ...state, 
                currentPlayingSong: action.songId
            }
        default:
            return state;
    }
}

export default queueReducer;
