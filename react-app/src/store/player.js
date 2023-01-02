const LOAD_SONG = "player/loadSong"; 
const PLAY = "player/play";
const PAUSE = "player/pause";
const ENDED = "player/ended";
const SYNC_PROGRESS = "player/syncProgress";
const SEEK = "player/seek";
const ADJUST_VOLUME = "player/adjustVolume";


class AudioController {
    constructor(audio) {
        this.audio = audio;
        if (!localStorage.getItem('volume')) {
            localStorage.setItem('volume', 0.7);
        }
        this.audio.volume = localStorage.getItem('volume');
    }

    loadSource(src) {        
        this.audio.src = src;
        this.audio.play();
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    currentTime() {
        return this.audio.currentTime;
    }

    duration() {
        return this.audio.duration;
    }

    seek(time) {
        this.audio.currentTime = time;
    }
    
    volume() {
        return this.audio.volume * 100.0;
    }

    adjustVolume(number) {
        localStorage.setItem('volume', number / 100.0);
        this.audio.volume = number / 100.0;
    }

    onEnded(cb) {
        this.audio.onended = cb;
    }
}

const controller = new AudioController(document.getElementById('audio-control'));

export const loadSong = (song) => async (dispatch) => {
    controller.loadSource(`/api/songs/file/${song.id}`);
    controller.onEnded (() => {
        dispatch(ended());
    });

    dispatch({
        type: LOAD_SONG,
        song,
        currentTime: controller.currentTime(),
        duration: controller.duration(),
        volume: controller.volume()
    });
};

export function play() {
    controller.play();

    return {
        type: PLAY
    };
}

export function pause() {
    controller.pause();

    return {
        type: PAUSE
    };
}

export function ended() {
    return {
        type: ENDED
    };
}

export function syncProgress() {
    return {
        type: SYNC_PROGRESS,
        currentTime: controller.currentTime(),
        duration: controller.duration(),
    };
}

export function seek(time) {
    controller.seek(time);

    return {
        type: SEEK,
        time
    };
}

export function adjustVolume(number) {
    controller.adjustVolume(number);
    return {
        type: ADJUST_VOLUME,
        number
    };
}

const initialState = {
    song: null,
    playing: false,
    currentTime: null,
    duration: null,
    volume: controller.volume(),
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SONG:
            return {
                song: action.song,
                playing: true,
                currentTime: action.currentTime,
                duration: action.duration,
                volume: action.volume
            };
        case PLAY:
            return {
                ...state,
                playing: true,
            };
            
        case PAUSE:
            return {
                ...state,
                playing: false,
            };
        case ENDED:
            return {
                ...state,
                playing: false
            };
        case SYNC_PROGRESS:
            return {
                ...state,
                currentTime: action.currentTime,
                duration: action.duration,
            };
        case SEEK:
            return {
                ...state,
                currentTime: action.time
            };
        case ADJUST_VOLUME: 
            return {
                ...state, 
                volume: action.number
            }
        default:
            return state;
    }
}

export default playerReducer;
