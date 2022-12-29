import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserPage = () => {
    const songs = useSelector(state => state.songs.songs); 
    




    return (
        <div>
            
            <div>
                User Info
            </div>
            <div>
                Song Uploaded 
            </div>
            <div>
                Playlist
            </div>
            <div>
                Like - COMING SOON
            </div>
        </div>
    )
}

export default UserPage;
