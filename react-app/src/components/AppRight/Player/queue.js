// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import * as queueAction from "../../../store/queue";
// import * as playerAction from "../../../store/player";

// const Queue = () => {
//     const dispatch = useDispatch();
//     const { list } = useSelector(state => state.queue);
    
//     useEffect(() => {
//         dispatch(queueAction.loadQueue());
//     }, [dispatch]);

//     useEffect(() => {
//         if (list !== null) {
//             console.log('**********************************', 'listhere', list); 
//             for (let songQueue of list) {
//                 const songInfo = {
//                     id: songQueue.song.id, 
//                     artistName: songQueue.song.artistName, 
//                     name: songQueue.song.name,
//                     length: songQueue.song.length
//                 }
//                 console.log('**********************************', 'songQWue', songInfo); 
//                 dispatch(playerAction.loadSong(songInfo))
//             }
//         }
//     }, [list])


//     return (
//         <div>

//         </div>
//     )

// }

// export default Queue;
