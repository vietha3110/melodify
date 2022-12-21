import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const PlaylistForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); 
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('make a playlist')
    }
    
    return (
        <div>
            <div>
                <img src='https://live.staticflickr.com/65535/52578444619_ca0f977822.jpg'/>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Add a name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='textarea'
                        placeholder='Add an optional description'
                    />
                </div>
                <div>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )

}

export default PlaylistForm;
