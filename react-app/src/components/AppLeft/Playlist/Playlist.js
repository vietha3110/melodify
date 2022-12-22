import * as playlistAction from '../../../store/playlist';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../Modal';

const Playlist = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists.playlists);
    const user = useSelector(state => state.session.user); 

    
    useEffect(() => {
        dispatch(playlistAction.fetchUserList());
    }, [dispatch]);

    return (
        <>
            Playlist will render here
            <div>
                {user !== null && playlists && Object.values(playlists).map(
                    (playlist) => (
                        <div>
                            {playlist.name}
                        </div>
                    )
                )}
            </div>
        </>
    )
}

export default Playlist; 
