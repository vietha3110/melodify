import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as playlistAction from "../../../store/playlist";
function changeSecondToTime(length) {
    const minute = Math.floor(length % 3600 / 60).toString().padStart(2, '0');
    const second = Math.floor(length % 60).toString().padStart(2, '0');
    return minute + ":" + second;
}


const PlaylistPage = () => {
    const { playlistId } = useParams();
    const playlists = useSelector(state => state.playlists.playlists);
    const playlist = playlists[+playlistId]
    const dispatch = useDispatch();

 
    const removeSong = (i, song) => (e) => {
        e.stopPropagation();
        const id = song.id;
        const playlist_id = +playlistId;
        const songInfo = {id, playlist_id }
        dispatch(playlistAction.removeSongFromPlaylist(songInfo));
       
    }

    return (
        <div className="listpage-container">
            <div className="listpage-title">
                {playlist.name}
            </div>
            <div className="listpage-content listpage-head">
                <span>#</span>
                <span>Title</span>
                <span>Artist</span>
                <span>Genre</span>
                <span>Time</span>
                <span></span>
            </div>
            {
                playlist.playlist_songs.map((song, i) =>
                        <div className="listpage-content listpage-song" key={i}>
                            <span>
                                {i + 1}
                            </span>
                            <Link to={`/songs/${song.songId}`}>
                                {song.song.name}
                            </Link>
                            <span>
                                {song.song.artistName}
                            </span>
                            <span>
                                {song.song.genre}
                            </span>
                            <span>
                                {
                                    changeSecondToTime(song.song.length)
                                }
                            </span>
                            <span onClick={removeSong(i, song)}>
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                        </div>
                    
                )
            }
           
        </div>
    )
}

export default PlaylistPage;
