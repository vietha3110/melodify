import * as songAction from '../../../store/song';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
                    <div key={i}>
                        <span>{song.name}</span>
                    </div>
                )
            )}
        </div>
    )
}


export default Home;
