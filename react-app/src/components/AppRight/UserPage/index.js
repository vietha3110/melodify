import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userSongsAction from "../../../store/userSong";

const UserPage = () => {
    const songs = useSelector(state => state.userSongs.songs); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userSongsAction.fetchUserSongs())
    }, [])

    const deleteSong = (i) => (e) => {
        e.stopPropagation();
        console.log('remove', i)
    }


    return (
        <div>
            
            <div>
                User Info
            </div>
            <div>
                Song Uploaded 
                <>
                    <div>
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
                            <div key={i}>
                                <span>
                                    {song.name}
                                </span>
                                <span>
                                    {song.artistName}
                                </span>
                                <div onClick={deleteSong(i)}>
                                    Delete
                                </div>
                            </div>
                        ))
                    }
                </>
            </div>
           
            <div>
                Like - COMING SOON
            </div>
        </div>
    )
}

export default UserPage;
