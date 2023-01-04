const ADD_SONG = "queue/addList";
const LOAD_QUEUE = "queue/loadQueue";

export function addSong(list) {
    return {
        type: ADD_SONG,
        list
    }
}

export function loadQueue() {
    return {
        type: LOAD_QUEUE
    }
}

const initialState = { list: null };


const queueReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_SONG:
            console.log('**********************************',action.list);
            return {
                list: action.list
            }
        case LOAD_QUEUE:
            return state;
        default:
            return state;
    }
}



export default queueReducer;
