import { useState } from "react";
import { useDispatch } from "react-redux";
import * as songActions from "../../../store/song";
import { useHistory } from "react-router-dom";

function readAsUtf8String(file) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    return new Promise((resolve, reject) => {
        fileReader.onloadend = () => {
            if (fileReader.error) {
                reject(fileReader.error);
            } else {
                const result = Array.from(new Uint8Array(fileReader.result));
                resolve(result);
            }
        };
    });
}

function readAsDataURL(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
        fileReader.onloadend = () => {
            if (fileReader.error) {
                reject(fileReader.error);
            } else {
                resolve(fileReader.result);
            }
        };
    });
}

function getDuration(dataUrl) {
    const audio = new Audio();
    audio.src = dataUrl;

    return new Promise((resolve) => {
        audio.onloadedmetadata = () => {
            resolve(Math.round(audio.duration));
        };
    });
}

const UploadSong = () => {
    const [file, setFile] = useState('');
    const [error, setError] = useState({});
    const [name, setName] = useState('');
    const [artist_name, setArtistName] = useState('');
    const [genre, setGenre] = useState('pop');
    const [length, setLength] = useState(0);
    const [fileStatus, setFileStatus] = useState('NOT_LOADED');
    const dispatch = useDispatch();
    const history = useHistory();
    const [temp, setTemp] = useState(null);
    const [submitStatus, setSubmitStatus] = useState('NOT_SUBMITTING');

    const updateFile = async (e) => {
        setError({});
        const errors = {};
        const file = e.target.files[0];
        if (!file) {
            errors.type = 'Please upload mp3 file.';
            setError(errors);
            return;
        }
        
        if (file.type !== "audio/mpeg") {
            errors.type = 'Please upload mp3 file.';
        }

        if (file.size > 5000000) {
            errors.size = 'Please upload file below 5mb';
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            setFileStatus('LOADING');
            return;
        }

        const binaryString = await readAsUtf8String(file);
        const dataUrl = await readAsDataURL(file);
        const duration = await getDuration(dataUrl);
        setLength(duration);
        setFile(binaryString);
        if (Object.keys(errors).length === 0) {
            setFileStatus('LOADED');
        }
        
    }

    const handleSelect = (e) => {
        setGenre(e.target.value)
    }

  
    const handleSubmit = async (e) => {
        setSubmitStatus('SUBMITTING');
        e.preventDefault();
        setError({});
        const errors = {};
        const audioFile = file;
        const song = { name, artist_name, genre, length, audioFile };
        const data = await dispatch(songActions.createSong(song));
        setSubmitStatus('SUBMITTED');
        if (!data) {
            history.push('/');
        } else {
            errors.type = "An error occurred. Please try again"
            setError(errors);
            return;
        }
    }

    const isSubmitEnabled = fileStatus === 'LOADED' && name !== '' && artist_name !== '' && submitStatus === 'NOT_SUBMITTING' && name.trim() !== "" && artist_name !== "";

    return (
        <div className="uploadsong-container" onSubmit={handleSubmit} >
            <form className="uploadsong-form">
                <div className="uploadsong-title">
                    <h1>Drop your music here</h1>
                </div>
                <div className="uploadsong-content">
                    <div className="uploadsong-name uploadinfo">
                        <label> Title <span style={{color:"red", fontSize:"1rem"}}>*</span></label>
                        <input
                            type="text"
                            placeholder="Title length must be between 1 and 100 characters."
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            minLength="1"
                            maxLength="100"
                        />
                        {
                              error && 
                              <div className="upload-error">
                                      <span>{error.name}</span>
                              </div>
                        }
                    </div>
                    <div className="uploadsong-genre uploadinfo">
                        <label>Genre <span style={{color:"red", fontSize:"1rem"}}>*</span> </label>
                        <select onChange={handleSelect} style={{padding: "5px", margin: "5px 5px 0px 0px"}}>
                            <option value="pop">Pop</option>
                            <option value="rnb">R&B</option>
                            <option value="rock">Rock</option>
                            <option value="electronic">Electronic</option>
                            <option value="classical">Classical</option>
                            <option value="hiphop">Hiphop & Rap</option>
                        </select>

                    </div>
                    <div className="uploadsong-artist uploadinfo">
                        <label>Artist <span style={{color:"red", fontSize:"1rem"}}>*</span> </label>
                        <input
                            type="text"
                            placeholder="Artist name length must be between 1 and 100 characters."
                            value={artist_name}
                            onChange={e => setArtistName(e.target.value)}
                            required
                            minLength="1"
                            maxLength="100"
                        />
                        {
                            error && 
                            <div className="upload-error">
                                    <span>{error.artist}</span>
                            </div>
                        }
                    </div>
                    <div className="uploadsong-upload uploadinfo">
                        <input
                            type="file"
                            onChange={updateFile}
                        />
                        {
                            error && 
                            <div className="upload-error">
                                <span>{error.type}</span>
                                <span>{error.size}</span>
                            </div>
                        }
                    </div>
                        {
                            fileStatus === "LOADING" &&
                            <div></div>
                        }
                    <div className="uploadsong-btnupload">
                        {
                            error && (error.type || error.size) &&
                            <i className="fa-solid fa-circle-exclamation"></i>
                        }
                        <button type="submit" disabled={!isSubmitEnabled}>{submitStatus === 'SUBMITTING' ? 'Uploading' : 'Upload'}</button>
                    </div>
                    <span style={{paddingLeft:"15px", fontSize:"0.8rem"}}>* : required</span>
                </div>
            </form>
            <div>
                <p>By uploading, you confirm that your file comply with our Terms of Use and you don't infringe anyone else's rights.</p>
            </div>
        </div>
    )
}

export default UploadSong;
