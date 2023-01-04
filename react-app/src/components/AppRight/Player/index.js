import ReactSlider from 'react-slider';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as playerAction from '../../../store/player';
import * as queueAction from '../../../store/queue';


const Player = () => {
    const { song, playing, duration, currentTime, volume, muted } = useSelector(state => state.player);
    const dispatch = useDispatch();

    useEffect(() => {
        setInterval(() => {
            dispatch(playerAction.syncProgress());
        }, 500);
    }, [dispatch]);
    
    const onPauseClick = () => {
        if (!song) {
            return;
        }
        dispatch(playerAction.pause());
    };

    const onPlayClick = () => {
        if (!song) {
            return;
        }

        dispatch(playerAction.play());
    };

    const onSliderChange = (time) => {
        dispatch(playerAction.seek(time));
    };

    const onChangeVolume = (volume) => {
        dispatch(playerAction.adjustVolume(volume));
    }

    const toggleMute = () => {
        dispatch(playerAction.mute(true));
    }

    const toggleUnMute = () => {
        dispatch(playerAction.mute(false));
    }

    const onForwardClick = () => {
        dispatch(queueAction.nextSong());
    }

    const onBackwardClick = () => {
        dispatch(queueAction.previousSong());
    }

    return (
        <div className='navbar-player'>
            <div className='player-controls'>
                <i class="fa-solid fa-shuffle"></i>
                <i class="fa-solid fa-backward" onClick={onBackwardClick} ></i>
                <div className='player-controls-play-pause'>
                    {
                        playing &&
                            <i className="fa-solid fa-pause" onClick={onPauseClick}></i>
                    }
                    {
                        !playing &&
                        <i className="fa-solid fa-play" onClick={onPlayClick}></i>
                    }
                </div>
                <i className="fa-solid fa-forward" onClick={onForwardClick}></i>
                <i class="fa-solid fa-repeat"></i>
            </div>
            <div className='player-lcd'>
                <div className='player-lcd-artwork'>
                    <img src='https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/14/14/e6141444-6597-4c3a-7ad1-86304528acf4/22UMGIM45569.rgb.jpg/88x88bb.jpg'/>
                </div>
                {
                    !song && 
                    <div className='player-lcd-nosong'><i className="fa-solid fa-headphones" ></i></div>
                }
                <div className='player-lcd-meta'>
                    <div className='player-lcd-meta-title'>
                        {
                            song && song.name
                        }
                        
                    </div>
                    <div className='player-lcd-meta-artist'>
                        {song && song.artistName}
                    </div>
                    <div>
                        {song && <ReactSlider
                            onChange={onSliderChange}
                            className="player-lcd-progress-slider"
                            thumbClassName="player-lcd-progress-thumb"
                            trackClassName="player-lcd-progress-track"
                            value={currentTime ? currentTime : 0}
                            max={duration ? duration : 0}
                            renderThumb={(props, state) => <div {...props}></div>}
                        />}
                    </div>
                </div>
            </div>
            <div className='player-volume'>
                <div className='player-volume-on-off'>
                    {
                        (volume === 0 || muted) &&
                        <i class="fa-solid fa-volume-off" onClick={toggleUnMute}></i>
                    }
                    {
                        (volume !== 0 && !muted)  &&
                        <i class="fa-solid fa-volume-high" onClick={toggleMute}></i>
                    }
                </div>
                <ReactSlider
                        onChange={onChangeVolume}
                        className="player-volume-progress-slider"
                        thumbClassName="player-volume-progress-thumb"
                        trackClassName="player-volume-progress-track"
                        value={muted ? 0 : volume}
                        max={100}
                        renderThumb={(props, state) => <div {...props}></div>}
                    />
            </div>
        </div>
    )
}

export default Player;
