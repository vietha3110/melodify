import * as songAction from '../../../store/song';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as playerAction from '../../../store/player';
import * as playlistAction from '../../../store/playlist';
import imgBox from './imgBox.png';
import PlaylistSong from './PlaylistSong';

function changeSecondToTime(length) {
    const minute = Math.floor(length % 3600 / 60).toString().padStart(2, '0');
    const second = Math.floor(length % 60).toString().padStart(2, '0');
    return minute + ":" + second;
}

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const songs = useSelector(state => state.songs.songs);
    const playlists = useSelector(state => state.playlists.playlists);
    // console.log('hihihihihihih',Object.keys(playlists).length);
    const [openings, setOpenings] = useState({});

    useEffect(() => {
        dispatch(songAction.fetchAllSongs());
        dispatch(playlistAction.fetchUserList());
     
    }, [dispatch]);

    const onSongClick = (song) => () => {
        dispatch(playerAction.loadSong(song));
    };

    const addSongClick = (i) => () => {
        const newOpenings = {
            ...openings,
            [i]: !openings[i]
        };
        setOpenings(newOpenings);
    };

    return (
        <div className="home-container">
            {songs && Object.values(songs).map(
                (song, i) => (
                    <div key={i} className="song-box" >
                        <div className='song-box-img'>
                            <img src={imgBox} />
                                <div className='song-box-playbutton' onClick={onSongClick(song)}>
                                    <i className="fa-solid fa-play"></i>
                                </div>
                            {user !== null && playlists && Object.keys(playlists).length > 0 &&
                                <div>
                                    <div className='song-box-addbutton' onClick={addSongClick(i)}>
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </div>
                                    {openings[i] && 
                                        <PlaylistSong i={i} song={song} onClose={ ()=> setOpenings(true)} />
                                    }
                                </div>
                               
                            }
                        </div>
                        
                        <div className='song-box-info'>
                            <div className='song-box-info-title'>
                                <span>{song.name}</span>
                            </div>
                    
                            <div className='song-box-info-artist'>
                                <span>
                                    {song.artistName}
                                </span>

                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}


export default Home;
