import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as playlistAction from "../../../store/playlist";
import { Modal } from "../../Modal";

const PlaylistSong = ({songId, onClose}) => {
    const playlists = useSelector(state => state.playlists.playlists);
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const addToList = (i, playlist) => (e) => {
        e.stopPropagation();
        const song = {
            playlistId: playlist.id, 
            song_id: +songId
        }
        const res = dispatch(playlistAction.addSongToPlaylist(song))
            .then((response) => {
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

    return (
        <div>
            List Here
            {playlists && Object.values(playlists).map(
                (playlist, i) => (
                    <>
                        <div key={i} onClick={addToList(i, playlist)}>
                            <span>{playlist.name}</span>
                        </div>
                        {
                            error && (
                                showModal && (
                                    <Modal>
                                        <div>
                                            {error}
                                        </div>
                                        <div onClick={closeModal}>
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
    )
}

export default PlaylistSong;
