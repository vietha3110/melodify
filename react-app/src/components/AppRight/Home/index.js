import * as songAction from '../../../store/song';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as playerAction from '../../../store/player';
import stereoSound from './stereoSound.png';

function changeSecondToTime(length) {
    const minute = Math.floor(length % 3600 / 60).toString().padStart(2, '0');
    const second = Math.floor(length % 60).toString().padStart(2, '0');
    return minute + ":" + second;
}

const Home = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.songs);

    useEffect(() => {
        dispatch(songAction.fetchAllSongs());
    }, [dispatch]);

    const onSongClick = (song) => () => {
        dispatch(playerAction.loadSong(song));
    };
    
    return (
        <div className="home-container">
            {songs && Object.values(songs).map(
                (song, i) => (
                    <div key={i} className="song-box" >
                        <div className='song-box-img'>
                            <img src='https://www.teachhub.com/wp-content/uploads/2019/10/Our-Top-10-Songs-About-School-768x569.png' />
                        </div>
                        <div className='song-box-playbutton-wrapper'>
                            <div className='song-box-playbutton' onClick={onSongClick(song)}>
                                    <i className="fa-solid fa-play"></i>
                                </div>
                        </div>
                        <div className='song-right'>
                            <div className='song-right-title'>
                                <span>{song.name}</span>
                            </div>
                    
                            <div className='song-right-info'>
                                <div>
                                    {changeSecondToTime(song.length)}
                                </div>

                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}


export default Home;
