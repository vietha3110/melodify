import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as playlistAction from "../../../store/playlist";
import { Modal } from "../../Modal";

const PlaylistSong = ({song, i, onClose }) => {
    const playlists = useSelector(state => state.playlists.playlists);
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const addToList = (i, playlist) => (e) => {
        const songInfo = {
            playlistId: playlist.id, 
            song_id: song.id
        }

        const res = dispatch(playlistAction.addSongToPlaylist(songInfo))
            .then(res => {
                onClose();
            })
            .catch((err) => {
                setError(err);
                setShowModal(true);
            })
       
    }
    const closeModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
    }
    
    useEffect(() => {
        dispatch(playlistAction.fetchUserList());
    }, [dispatch])
    return (
        <>
            <div className='addlist-container'>
                {playlists && Object.values(playlists).map(
                    (playlist, i) => (
                        <>
                            <div key={i} onClick={addToList(i, playlist)} className='addlist-info'>
                                <span>{playlist.name}</span>
                            </div>
                            {
                                error && (
                                    showModal && (
                                        <Modal>
                                            <div className="addlist-error">
                                                {error}
                                            </div>
                                            <div onClick={closeModal} className="addlist-error-confirm">
                                                <span>OK</span>
                                            </div>
                                        </Modal>
                                    )
                                )
        
                            }
                        </>
                    )
                )}
                </div>
        </>
    )
}

export default PlaylistSong;
