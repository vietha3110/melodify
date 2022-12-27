import logo from '../AppLeft/Playlist/Melodify.png';
// import PlaylistModal from './Playlist';
import Playlist from './Playlist/Playlist';
import PlaylistForm from './Playlist/PlaylistForm';
import { Modal } from '../Modal';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import createIcon from './Playlist/createicon.png';
import radioIcon from './Playlist/radioicon.png';
import playMusic from './Playlist/playmusic.png'; 
import { Link } from 'react-router-dom';
const LeftBox = () => {
    const [showModal, setShowModal] = useState(false); 
    const user = useSelector(state => state.session.user); 


    return (
        <div className='app-left-main'>
            <Link className='app-left-logo' to='/'>
                <img src={logo} className='main-logo' />
                <span style={{fontSize: '1.4rem'}}>Melodify</span>
            </Link>
            <div className='app-left-search'>
                <span class="material-symbols-outlined" style={{padding: 8}}>
                    search
                </span>
                <span style={{ padding: 6}}>
                    Search
                </span>
            </div>
            <div className='app-letf-listen'>
                <img src={playMusic} className='playmusic-logo' />
                <span> Listen Now</span>
            </div>
            <div className='app-left-radio'>
                <img src={radioIcon} className='radio-logo' />
                <span>Radio</span>
            </div>
            {user !== null &&  <div onClick={() => setShowModal(true)} className='app-left-make-playlistcomp'>
                <img src={createIcon} className='main-logo' />
                <span>New Playlist</span>
            </div>
            
            }
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <PlaylistForm onClose={() => setShowModal(false)}/>
                    </Modal>
                )}
            <div className='app-left-playlistarea'>
               <Playlist/> 
            </div>
        </div>
    )
}

export default LeftBox;
