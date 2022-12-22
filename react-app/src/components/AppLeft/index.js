import logo from '../AppLeft/Playlist/Melodify.png';
// import PlaylistModal from './Playlist';
import Playlist from './Playlist/Playlist';
import PlaylistForm from './Playlist/PlaylistForm';
import { Modal } from '../Modal';
import { useState } from 'react';
const LeftBox = () => {
    const [showModal, setShowModal] = useState(false); 

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
                 <button onClick={() => setShowModal(true)}>New Playlist</button>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <PlaylistForm onClose={() => setShowModal(false)}/>
                        </Modal>
                    )}
            </div>
            <div>
               <Playlist/> 
            </div>
        </>
    )
}

export default LeftBox;
