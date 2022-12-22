import * as playlistAction from '../../../store/playlist';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../Modal';
import musicNote from '../Playlist/musicNote.png';
import playlistIcon from '../Playlist/playlist-icon.png';

const Playlist = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists.playlists);
    const user = useSelector(state => state.session.user); 

    
    useEffect(() => {
        dispatch(playlistAction.fetchUserList());
    }, [dispatch, user]);

    return (
        <>
            <div>
                <img src={playlistIcon} className='playlist-icon' style={{height:20, width:32}}/>
                <span>Your Playlists</span>
            </div>
            <div>
                {user !== null && playlists && Object.values(playlists).map(
                    (playlist) => (
                        <div>
                            <img src={musicNote} className='musicnote'/>    
                            <span>{playlist.name}</span>
                        </div>
                    )
                )}
            </div>
        </>
    )
}

export default Playlist; 
