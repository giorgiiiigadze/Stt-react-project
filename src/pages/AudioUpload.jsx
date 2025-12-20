import { useState } from 'react';
import Header from '../components/Header';
import { useToast } from '../contexts/MessageContext';
import AudioUploadPanel from '../components/Upload/AudioUploadPanel';

import '../css/AudioUpload.css'

export default function AudioUpload(){
    const [title, setTitle] = useState('')
    const { addToast } = useToast()

    function handleTitle(e){
        // Will be adding this with upload button
        // if(e.target.value.length > 35){
        //     addToast("The audio title must be fewer than 35 characters", 'error')
        //     return
        // }
        setTitle(e.target.value);           
    }

    return (
        <>
            <Header></Header>
            <div className="container">
                <main className="container-upload-main">
                    <div className="audio-upper-section">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>
                            Add Image
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>
                            Add Image
                        </button>
                        <button>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            Add Comment
                        </button>
                    </div>
                    <div className="audio-upload-title">
                        <input 
                            type="text" 
                            placeholder='Audio Title'
                            value={title}
                            onChange={(e) => {
                                handleTitle(e)
                            }}
                        />
                    </div>
                    <div className="audio-file-upload">
                        <p>Upload your audio file</p>
                        <AudioUploadPanel />
                    </div>

                    <footer className='audio-upload-footer'>
                        <button className='question-mark-button'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M424-320q0-81 14.5-116.5T500-514q41-36 62.5-62.5T584-637q0-41-27.5-68T480-732q-51 0-77.5 31T365-638l-103-44q21-64 77-111t141-47q105 0 161.5 58.5T698-641q0 50-21.5 85.5T609-475q-49 47-59.5 71.5T539-320H424Zm56 240q-33 0-56.5-23.5T400-160q0-33 23.5-56.5T480-240q33 0 56.5 23.5T560-160q0 33-23.5 56.5T480-80Z"/></svg>
                        </button> 
                                           
                        <button className='post-button'>Upload</button>
                    </footer>
                </main>
            </div>
        </>
    )
}