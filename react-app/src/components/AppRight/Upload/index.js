import { useSelector } from "react-redux";
import { useState } from "react";

const UploadSong = () => {
    const [file, setFile] = useState('');
    const [error, setError] = useState('');
    const [drag, setDrag] = useState(false);

    const updateFile = (e) => {
        e.preventDefault();
        const newFile = e.target.files[0]; 
        console.log(newFile);
    
        // const length = e.timeStamp;
  
        if (newFile.type !== "audio/mpeg") {
            setError('Please upload mp3, ')
        }
    }

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDrag(true);
            
        } else if (e.type === "dragleave") {
            setDrag(false);
        
        }
    };
  
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
    
        const fileData = e.dataTransfer.files[0];
        const newFile = fileData.name;
        console.log('drop', newFile);
        setFile(newFile);
    }

    
    
    return (
        <div className="uploadsong-container">
            <form className="uploadsong-content" onDragEnter={handleDrag}>
                <div className="uploadsong-title">
                    <h1>Drop your music here</h1>
                </div>
                <div className="uploadsong-drag-drop">
                    {drag && (
                        <div className="test" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                            
                        </div>
                    )}
                </div>
                {
                                file  && 
                                <div>
                                        { file}
                                </div>
                             }
                <div className="uploadsong-upload">
                    <input
                        type="file"
                        onChange={updateFile}
                    />
                </div>
                <div>
                    <button>Upload</button>
                </div>
            </form>
            {
                error && 
                <div>
                        {error}
                </div>
            }

        </div>
    )
}

export default UploadSong;
