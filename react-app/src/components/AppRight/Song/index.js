import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songAction from "../../../store/song"

const SongAudio = () => {
    const { fileId } = useParams();
    const id = +fileId;
    const [error, setError] = useState('');
    // const dispatch = useDispatch();
    // const songs = useSelector(state => state.songs.songs);


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

    
    return (
        <div className="audio-container"> 
            <div>
                <audio controls>
                    <source src={`/api/songs/file/${id}`} />
                </audio>
            </div>
            <div>
                <button> Add to playlist</button>
            </div>
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
