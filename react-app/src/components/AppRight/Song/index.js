import { useParams } from "react-router-dom";

const SongAudio = () => {
    const { fileId } = useParams();
    const id = +fileId;
    return (
        <div> 
            <audio controls> 
                <source src={`/api/songs/file/${id}`} />
            </audio>
        </div>
    )
}

export default SongAudio;
