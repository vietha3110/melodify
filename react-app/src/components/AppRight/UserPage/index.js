import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userSongsAction from "../../../store/userSong";

const UserPage = () => {
    const songs = useSelector(state => state.userSongs.songs); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userSongsAction.fetchUserSongs())
    }, [])

    const deleteSong = (i, song) => (e) => {
        e.stopPropagation();
        dispatch(userSongsAction.deleteSong(song.id));
    }


    return (
        <div className="userprofile-container">
            <div className="userprofile-info">
                User Info
            </div>
            <div className="userprofile-song">
                Songs
                <div className="userprofile-song-main">
                    <div className="userprofile-song-label userprofile-content">
                        <span>
                            Title
                        </span>
                        <span>
                            Artist
                        </span>
                        <span>
                             
                        </span>
                    </div>
                    {
                        songs && Object.values(songs).map((song, i) => (
                            <div key={i} className="userprofile-song-content userprofile-content">
                                <span>
                                    {song.name}
                                </span>
                                <span>
                                    {song.artistName}
                                </span>
                                <span onClick={deleteSong(i, song)}>
                                    Delete
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                Playlists
            </div>
            <div>
                Like - COMING SOON
            </div>
        </div>
    )
}

export default UserPage;
