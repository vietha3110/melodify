import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function changeSecondToTime(length) {
    const minute = Math.floor(length % 3600 / 60).toString().padStart(2, '0');
    const second = Math.floor(length % 60).toString().padStart(2, '0');
    return minute + ":" + second;
}


const PlaylistPage = () => {
    const { playlistId } = useParams();
    const playlists = useSelector(state => state.playlists.playlists);
    const playlist = playlists[+playlistId]
    console.log(playlist.playlist_songs)


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
            </div>
            {
                playlist.playlist_songs.map((song, i) =>
                 
                       
                        <div className="listpage-content listpage-song">
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
                        </div>
                    
                )
            }
           
        </div>
    )
}

export default PlaylistPage;
