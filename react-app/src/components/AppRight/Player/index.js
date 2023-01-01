import ReactSlider from 'react-slider';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as playerAction from '../../../store/player';


const Player = () => {
    const { song, playing, duration, currentTime } = useSelector(state => state.player);
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
    
    return (
        <div className='navbar-player'>
            <div className='player-controls'>
                <i class="fa-solid fa-shuffle"></i>
                <i class="fa-solid fa-backward"></i>
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
                <i className="fa-solid fa-forward"></i>
                <i class="fa-solid fa-repeat"></i>
            </div>
            <div className='player-lcd'>
                <div className='player-lcd-artwork'>
                    <img src='https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/14/14/e6141444-6597-4c3a-7ad1-86304528acf4/22UMGIM45569.rgb.jpg/88x88bb.jpg'/>
                </div>
                <div className='player-lcd-meta'>
                    <div className='player-lcd-meta-title'>
                        {song && 
                            song.name
                        }
                    </div>
                    <div className='player-lcd-meta-artist'>
                        {song && song.artistName}
                    </div>
                    <div>
                    <ReactSlider
                        onChange={onSliderChange}
                        className="player-lcd-progress-slider"
                        thumbClassName="player-lcd-progress-thumb"
                        trackClassName="player-lcd-progress-track"
                        value={currentTime ? currentTime : 0}
                        max={duration ? duration : 0}
                        renderThumb={(props, state) => <div {...props}></div>}
                    />
                    </div>
                </div>
            </div>
            <div className='player-volume'>
            </div>
        </div>
    )
}

export default Player;
