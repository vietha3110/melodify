const LOAD_SONG = "player/loadSong"; 
const PLAY = "player/play";
const PAUSE = "player/pause";
const SYNC_PROGRESS = "player/syncProgress";
const SEEK = "player/seek";
const ADJUST_VOLUME = "player/adjustVolume";


class AudioController {
    constructor(audio) {
        this.audio = audio;
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
        return this.audio.volume;
    }
    adjustVolume(number) {
        this.audio.volume = number;
    }
}

const controller = new AudioController(document.getElementById('audio-control'));

export function loadSong(song) {
    controller.loadSource(`/api/songs/file/${song.id}`);

    return {
        type: LOAD_SONG,
        song,
        currentTime: controller.currentTime(),
        duration: controller.duration(),
        volume: controller.volume()
    };
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
    }
}

const initialState = {
    song: null,
    playing: false,
    currentTime: null,
    duration: null,
    volume: null,
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
