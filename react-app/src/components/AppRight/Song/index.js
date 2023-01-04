// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as songAction from "../../../store/song";
// import PlaylistSong from "./PlaylistSong";

// const SongAudio = () => {
//     const { fileId } = useParams();
//     const id = +fileId;
   
//     const [open, setOpen] = useState(false);
//     const user = useSelector(state => state.session.user);
//     const dispatch = useDispatch();
//     const songInfo = useSelector(state => state.songs.singleSong);

//     useEffect(() => {
//         dispatch(songAction.fetchOneSong(id));
//     },[dispatch])

//     const handleClick = (e) => {
//         e.stopPropagation();
//         setOpen(true);
//     }
//     document.addEventListener('click', e => {
//         setOpen(false);
//     });
//     return (
//         <div className="audio-container"> 
//             <div className="audio-info">
//                 { songInfo &&
//                     <div className="audio-info-main">
//                         <span className="audio-name">{songInfo.name}</span>
//                         <span>{songInfo.artistName} - {songInfo.genre}</span>
//                     </div>
//                 }
               
//             </div>

//             <div className="audio-player-main">
//                 <div className="audio-display">
//                     <audio controls>
//                         <source src={`/api/songs/file/${id}`} />
//                     </audio>
//                 </div>
//                 { user !== null &&
//                     <div className="audio-display-addbtn">
//                         <button onClick={handleClick}> Add to playlist</button>
//                         {
//                     open &&
//                     <PlaylistSong songId={fileId} onClose={ ()=>setOpen(false)} />
//                 }
//                     </div>
//                 }
//             </div>
//         </div>
//     )
// }

// export default SongAudio;
