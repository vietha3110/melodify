import ReactSlider from 'react-slider';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import * as playerAction from '../../../store/player';
import * as queueAction from '../../../store/queue';
import LabelledButton from '../../LabelledButton';
import imgBox from '../Home/imgBox.png';

const Player = () => {
    const { song, playing, duration, currentTime, volume, muted } = useSelector(state => state.player);
    const { repeated, shuffled, list } = useSelector(state => state.queue);
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

    const onChangeVolume = (volume) => {
        dispatch(playerAction.adjustVolume(volume));
    };

    const toggleMute = () => {
        dispatch(playerAction.mute(true));
    };

    const toggleUnMute = () => {
        dispatch(playerAction.mute(false));
    };

    const onForwardClick = () => {
        dispatch(queueAction.nextSong());
    };

    const onBackwardClick = () => {
        dispatch(queueAction.previousSong());
    };

    const repeatClick = (repeat) => () => {
        dispatch(queueAction.repeatList(repeat));
    };

    const shuffleClick = (shuffle) => () => {       
        dispatch(queueAction.shuffleList(shuffle))
    };
    return (
        <div className='navbar-player'>
            <div className='player-controls'>
                {
                    shuffled && 
                    <i className="fa-solid fa-shuffle fa-shuffled" onClick={shuffleClick(false)}></i>
                }
                {   !shuffled &&
                    <i className="fa-solid fa-shuffle" onClick={shuffleClick(true)}></i>
                }
                <i className="fa-solid fa-backward" onClick={onBackwardClick} ></i>
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
                {
                    repeated && 
                    <i className="fa-solid fa-repeat fa-repeated" onClick={repeatClick(false)}></i>
                    
                }
                {
                    !repeated &&
                    <i className="fa-solid fa-repeat" onClick={repeatClick(true)}></i>
                }
               {/* style={{ cursor: "default", color: "rgba(0, 0, 0, 0.5)" }} */}
            </div>
            <div className='player-lcd'>
                <div className='player-lcd-artwork'>
                    <img src={imgBox} alt='icon' style={{boxShadow: "0 1px 1px rgb(0 0 0 / 1%), 0 2px 2px rgb(0 0 0 / 1%), 0 4px 4px rgb(0 0 0 / 2%), 0 8px 8px rgb(0 0 0 / 3%), 0 14px 14px rgb(0 0 0 / 3%)"}}/>
                </div>
                {
                    !song && 
                    <div className='player-lcd-nosong'><i className="fa-solid fa-headphones" style={{cursor:"default"}}></i></div>
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
                        <i className="fa-solid fa-volume-off" onClick={toggleUnMute}></i>
                    }
                    {
                        (volume !== 0 && !muted)  &&
                        <i className="fa-solid fa-volume-high" onClick={toggleMute}></i>
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
