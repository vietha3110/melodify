import * as playlistAction from '../../../store/playlist';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../Modal';
// import musicNote from '../Playlist/musicNote.png';
import playlistIcon from '../Playlist/playlist-icon.png';
import UpdateBox from './UpdateBox';
// import listIcon from '../Playlist/list-icon.png';
import { Link } from 'react-router-dom';

const Playlist = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists.playlists);
    const user = useSelector(state => state.session.user); 
    const [open, setOpen] = useState({});

    const [modalInfo, setModalInfo] = useState({
        show: false,
        content: <></>
    });

    useEffect(() => {
        dispatch(playlistAction.fetchUserList());
    }, [dispatch, user]);

    const handleClick = (i) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newOpens = {
            ...open,
            [i]: !open[i]
        };
        setOpen(newOpens);
        
    }

    return (
        <>
            <div className='playlist-header'>
                <img src={playlistIcon} className='playlist-icon'/>
                <span>Your Playlists</span>
            </div>
            <div className='playlist-content'>
                {user !== null && playlists && Object.values(playlists).map(
                    (playlist, i) => (
                        <div key={i} className='playlist-content-name'>
                            <div className='playlist-content-name-span' onClick={handleClick(i)}>
                                <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
                            </div>
                            <>
                                {modalInfo.show && (
                                    <Modal>
                                        {modalInfo.content}
                                    </Modal>
                                )}
                                <UpdateBox i={i} playlist={playlist} openModal={(content) => setModalInfo({ show: true, content })} closeModal={() => setModalInfo({ show: false })} />
                            </>
                        </div>
                    )
                )}
            </div>
        </>
    )
}

export default Playlist; 
