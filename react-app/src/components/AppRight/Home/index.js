import * as songAction from '../../../store/song';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as playerAction from '../../../store/player';

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
    },[dispatch])
    const onSongClick = (song) => (e) => {
        dispatch(playerAction.loadSong(song));
    }
    
    return (
        <div className="home-container">
            {songs && Object.values(songs).map(
                (song, i) => (
                    <div key={i} className="song-box" onClick={onSongClick(song)}>
                        <div className='song-left-img'>
                            <img src='https://static.vecteezy.com/system/resources/previews/004/813/745/original/christmas-greeting-card-design-with-christmas-tree-xmas-white-card-with-red-ornaments-gift-box-social-media-banner-with-the-pine-tree-candy-cane-sock-on-a-white-background-xmas-banner-xmas-card-free-vector.jpg'/>
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
