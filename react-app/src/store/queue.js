import * as playerAction from "./player";

const UPDATE_LIST = "queue/updateList"; 
const NEXT_SONG = "queue/nextSong"; 
const PREVIOUS_SONG = "queue/previousSong";
const PLAY_SONG_FROM_LIST = "queue/playSong";
const DELETE_SONG = "queue/deleteSong";


// accessing state in action creators - use GetState in thunks (Redux Thunk middleware )
export const updateList = (playlist) => async (dispatch) => {
    dispatch({
        type: UPDATE_LIST,
        playlist,
    });

    dispatch(playerAction.loadSong(playlist.list[0]));
    
}

export const nextSong = () => async (dispatch, getState) => {
    const state = getState().queue;
   
    if (state.currentPlayingSong === state.list.length - 1) {
        // dispatch(playerAction.ended());
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

export const playSong = (songId) => async (dispatch, getState) => {
    const song = getState().queue.list[songId];
    dispatch(playerAction.loadSong(song));
    dispatch({
        type: PLAY_SONG_FROM_LIST, 
        songId
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

const initialState = {
    list: null,
    currentPlayingSong: 0,
    repeated: false,
    listId: null
}

const queueReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LIST: 
            return {
                list: action.playlist.list,
                currentPlayingSong: 0,
                repeated: false,
                listId: action.playlist.playlistId
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
                currentPlayingSong: action.songId
            }
        case DELETE_SONG: 
            return {
                ...state,
                list: action.playlist
            }
        default:
            return state;
    }
}

export default queueReducer;
