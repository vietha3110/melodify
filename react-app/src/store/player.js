const LOAD_SONG = "player/loadSong"; 
const PLAY = "player/play";
const PAUSE = "player/pause";
const SYNC_PROGRESS = "player/syncProgress";
const SEEK = "player/seek";


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
}

const controller = new AudioController(document.getElementById('audio-control'));

export function loadSong(song) {
    controller.loadSource(`/api/songs/file/${song.id}`);

    return {
        type: LOAD_SONG,
        song,
        currentTime: controller.currentTime(),
        duration: controller.duration()
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

const initialState = {
    song: null,
    playing: false,
    currentTime: null,
    duration: null,
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SONG:
            return {
                song: action.song,
                playing: true,
                currentTime: action.currentTime,
                duration: action.duration,
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
            }
        default:
            return state;
    }
}

export default playerReducer;
