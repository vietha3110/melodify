import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songAction from "../../../store/song";
import PlaylistSong from "./PlaylistSong";

const SongAudio = () => {
    const { fileId } = useParams();
    const id = +fileId;
    const [error, setError] = useState('');
    // const dispatch = useDispatch();
    // const songs = useSelector(state => state.songs.songs);
    // const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    //check user if user === null => k hien thi add to list

    useEffect(() => {
        console.log(`i'm running`)
        fetch(`/api/songs/file/${id}`)
            .then((res) => {
                if (res.status === 400) {
                    console.log('here')
                    setError('Can not find this song! Please try again')
                }
            })
            .catch((err) => setError('Please try again!'));
    }, [])
    
    const handleClick = (e) => {
        e.stopPropagation();
        setOpen(true);
    }
    
    return (
        <div className="audio-container"> 
            <div>
                <audio controls>
                    <source src={`/api/songs/file/${id}`} />
                </audio>
            </div>
            <div>
                <button onClick={handleClick}> Add to playlist</button>
            </div>
            {
                open && 
                <PlaylistSong songId={fileId} onClose={ ()=>setOpen(false)} />
            }
            {
                error && (
                    <div>
                        {error}
                    </div>
                )
            }
        </div>
    )
}

export default SongAudio;
