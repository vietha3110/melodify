import logo from '../AppLeft/Playlist/Melodify.png';
import PlaylistModal from './Playlist';
import Playlist from './Playlist/Playlist';
const LeftBox = () => {
    return (
        <>
            <div>
                <img src={logo} className='main-logo' />
                <span>Music</span>
            </div>
            <div>Search</div>
            <div>
                <i className="fa-regular fa-circle-play"></i>
                <span>Listen Now</span>
            </div>
            <div>Radio</div>
            <div>
                <PlaylistModal/>
            </div>
            <div>
               <Playlist/> 
            </div>
        </>
    )
}

export default LeftBox;
