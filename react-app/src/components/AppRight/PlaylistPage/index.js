import { useEffect } from "react";
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
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(playlistAction.fetchUserList());
    },[dispatch])
 
    const removeSong = (i, song) => (e) => {
        e.stopPropagation();
        const id = song.id;
        const playlist_id = +playlistId;
        const songInfo = {id, playlist_id }
        dispatch(playlistAction.removeSongFromPlaylist(songInfo));
    }

    return (
        <div>
            {playlists && playlists[+playlistId] &&
                <div className="listpage-container">
                    <div className="listpage-title">
                        {playlists[+playlistId].name}
                    </div>
                    {playlists[+playlistId].playlist_songs.length > 0 &&
                        <div className="listpage-content listpage-head">
                            <span>#</span>
                            <span>Title</span>
                            <span>Artist</span>
                            <span>Genre</span>
                            <span>Time</span>
                            <span></span>
                        </div>
                    }
                    {
                        playlists[+playlistId].playlist_songs.length > 0 && playlists[+playlistId].playlist_songs.map((song, i) =>
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
                    {
                        playlists[+playlistId].playlist_songs.length === 0 &&
                        <div className="listpage-nosong">
                            Empty here. Let's find something for your playlist!
                        </div>
            
                    }
            
                </div >
            }
        </div>
    )
}

export default PlaylistPage;
