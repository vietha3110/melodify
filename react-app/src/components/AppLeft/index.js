import logo from '../AppLeft/Playlist/Melodify.png';
import PlaylistModal from './Playlist';
const LeftBox = () => {
    return (
        <div>
            <img src={logo} className='main-logo' />
            <span>Music</span>
            <div>Search</div>
            <div>Listen Now</div>
            <div>Radio</div>
            <div>
                <PlaylistModal/>
            </div>
        </div>
    )
}

export default LeftBox;
