import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as playerAction from '../../../store/player';
import * as queueAction from '../../../store/queue';

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
        const songInfo = { id, playlist_id }
        dispatch(playlistAction.removeSongFromPlaylist(songInfo));
    };
    const onSongClick = (song) => () => {
        const songInfo = { id: song.songId, artistName: song.song.artistName, name: song.song.name};
        dispatch(playerAction.loadSong(songInfo));
    };
    
    const onPlaylistClick = (playlist) => (e) => {
        const list = [];
        for (let song of playlist.playlist_songs) {
            list.push(song.song);
        }
       
        dispatch(queueAction.updateList(list));

    }

    return (
        <div className="listpage-main" style={{
            width:"100%"}}>
            {playlists && playlists[+playlistId] &&
                <div className="listpage-container">
                    <div className="listpage-title">
                        <span>{playlists[+playlistId].name}</span>
                        <div >
                            <i className="fa-solid fa-play" onClick={onPlaylistClick(playlists[+playlistId])}/>
                        </div>
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
                    <div>
                        {
                            playlists[+playlistId].playlist_songs.length > 0 && playlists[+playlistId].playlist_songs.map((song, i) =>
                                <div className="listpage-content listpage-song" key={i} style={{marginTop:"1rem"}}>
                                    <span>
                                        {i + 1}
                                    </span>
                                    <span onClick={onSongClick(song)} className='listpage-content-name listname-hover' style={{cursor:"pointer", padding:"1px"}}>
                                        {song.song.name}
                                    </span>
                                    <span className='listpage-content-name'>
                                        {song.song.artistName}
                                    </span>
                                    <span className='listpage-content-name'>
                                        {song.song.genre}
                                    </span>
                                    <span className='listpage-content-name'>
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
