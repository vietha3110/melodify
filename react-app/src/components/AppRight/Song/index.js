import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SongAudio = () => {
    const { fileId } = useParams();
    const id = +fileId;
    const [error, setError] = useState('');

    useEffect( () => {
        fetch(`/api/songs/file/${id}`)
            .then((res) => {
                if (res.status === 400) {
                    setError('Can not find this song! Please try again')
                }
            })
            .catch((err) => setError('Please try again!'));
    })

    return (
        <div> 
            <audio controls> 
                <source src={`/api/songs/file/${id}`} />
            </audio>
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
