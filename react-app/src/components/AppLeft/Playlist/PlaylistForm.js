import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as playlistAction from '../../../store/playlist';

const PlaylistForm = ({onClose}) => {
    const [validationErrors, setValidationErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); 
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
   
    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        const errors = {}
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

        dispatch(playlistAction.makePlaylist({ name, description }));
        onClose();
    }
    const handleCancel = (e) => {
        e.preventDefault();
        onClose();
    }
    
    return (
        <div className='playlistform-container'>
            <div className='playlistform-head'>
                <div  className='playlistform-header'>
                    <div className='playlistform-header-label'>
                        <span>Make New Playlist</span>
                    </div>
                    
                    <div className='playlistform-header-btn'>
                        <button className='playlistform-header-btn-close' onClick={handleCancel}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
                {
                    errors && 
                    <div className='playlistform-errors'>
                            <div>{errors.name}</div>
                            <div>{errors.description}</div>
                    </div>
                }
            </div>
            <div className='playlistform-content'>
                <div className='playlistform-logo'>
                    <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg'/>
                </div>
                <form onSubmit={handleSubmit} className='playlistform-content-form'>
                    <div className='playlistform-content-form-name form-focus'>
                        <input
                            type='text'
                            placeholder='Add a name (required *)'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                       
                    </div>
                    <div className='playlistform-content-form-desc form-focus'>
                        <textarea
                            type='text'
                            placeholder='Add an optional description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                     
                    </div>
                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default PlaylistForm;
