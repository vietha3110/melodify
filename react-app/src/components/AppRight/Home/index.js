import * as songAction from '../../../store/song';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.songs);

    useEffect(() => {
        dispatch(songAction.fetchAllSongs());
    },[dispatch])

    return (
        <div className="home-container">
            Song will be here
            {songs && Object.values(songs).map(
                (song, i) => (
                    <Link key={i} className="song-box" to={`/songs/${song.fileId}`}>
                        <div className='song-left-img'>
                            <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg'/>
                        </div>
                        <div className='song-right'>
                            <div className='song-right-title'>
                                <span>{song.name}</span>
                            </div>
                    
                            <div className='song-right-genre'>
                                <div>Dec-2022</div>

                            </div>
                        </div>
                    </Link>
                )
            )}
        </div>
    )
}


export default Home;
