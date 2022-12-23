import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as playlistAction from '../../../../../store/playlist';

const EditPlaylistForm = ({playlist, onClose}) => {
    const [name, setName] = useState(playlist.name);
    const [description, setDescription] = useState(playlist.description);
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const id = playlist.id; 

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        if (name.length <= 0 || name.length > 100) {
            errors.name = 'Name must be less than 100 characters.';
        }

        if (name.trim() === "") {
            errors.name = 'Name can not be blank.';
        }

        if (description.length > 300) {
            errors.description = 'Description must be less than 300 characters.';
        }
        
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        dispatch(playlistAction.updatePlaylist({id, name, description }));
        onClose();
       
    }
    
    const handleCancel = (e) => {
        e.preventDefault();
        onClose();
    }

    return (
        <div className='playlistform-container'>
        <div className='playlistform-header'>
            <div className='playlistform-header-label'>
                <span>Edit Detail</span>
            </div>
            <div className='playlistform-header-btn'>
                <button className='playlistform-header-btn-close' onClick={handleCancel}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        <div className='playlistform-content'>
            <div className='playlistform-logo'>
                <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg'/>
            </div>
            <form onSubmit={handleSubmit} className='playlistform-content-form'>
                <div className='playlistform-content-form-name'>
                    <input
                        type='text'
                        placeholder='Add a name (required)'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        // required
                    />
                    <p className="error-label">
                        {errors.name}
                    </p>
                </div>
                <div className='playlistform-content-form-desc'>
                    <textarea
                        type='text'
                        placeholder='Add an optional description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <p className="error-label">
                        {errors.description}
                    </p>
                </div>
                <div>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default EditPlaylistForm;
