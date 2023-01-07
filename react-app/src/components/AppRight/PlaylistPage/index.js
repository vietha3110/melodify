import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as playerAction from '../../../store/player';
import * as queueAction from '../../../store/queue';
import WaveBox from "../../Box";
import NotFound from "../../Notfound";

import * as playlistAction from "../../../store/playlist";
function changeSecondToTime(length) {
    const minute = Math.floor(length % 3600 / 60).toString().padStart(2, '0');
    const second = Math.floor(length % 60).toString().padStart(2, '0');
    return minute + ":" + second;
}


const PlaylistPage = () => {
    const { playlistId } = useParams();
    const playlists = useSelector(state => state.playlists.playlists);
    const { list, currentSong, listId } = useSelector(state => state.queue);
    const { playing } = useSelector(state => state.player);
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
        dispatch(queueAction.deleteSong(song.songId));
    };
    const onSongClick = (i, song) => () => {
        const songInfo = { id: song.songId, artistName: song.song.artistName, name: song.song.name};
        if (listId === +playlistId) {
            dispatch(queueAction.playSong(i));
        } else { 
            dispatch(queueAction.updateList({ list: [songInfo] }));
        }
    };
    
    const onPlaylistClick = (playlist) => (e) => {
        const list = [];
        for (let song of playlist.playlist_songs) {
            list.push(song.song);
        }
        dispatch(queueAction.updateList({ list, playlistId: playlist.id }));
    }

    return (
        <>
            {
                playlists && !playlists[+playlistId] && 
                <NotFound/>
            }
        <div className="listpage-main" style={{
            width:"100%"}}>
            {playlists && playlists[+playlistId] &&
                <div className="listpage-container">
                    <div className="listpage-title">
                        <div style={{marginRight:"15px"}}>
                            {
                                ((listId !== +playlistId || !playing) && playlists[+playlistId].playlist_songs.length > 0) &&
                                <i className="fa-solid fa-play listpage-title-playbtn" onClick={onPlaylistClick(playlists[+playlistId])}/>
                            }
                            {
                                list !== null && playing && listId === +playlistId &&
                                <WaveBox/>
                            }
                        </div>
                        <span>{playlists[+playlistId].name}</span>
                    </div>
                    {
                        playlists[+playlistId].playlist_songs.length > 0 &&
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
                                    <span onClick={onSongClick(i, song)} className='listpage-content-name listname-hover' style={{cursor:"pointer", padding:"1px"}}>
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
            </>
    )
}

export default PlaylistPage;
