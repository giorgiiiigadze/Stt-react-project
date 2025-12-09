import { useState } from 'react';
import Header from '../components/Header';
import '../css/AudioUpload.css'


export default function AudioUpload(){
    const [titleValue, setTitleValue] = useState('')

    return (
        <div className="contaner">
            <Header></Header>
            <main className="container-upload-main">
                <div className="audio-upper-section">
                    Hello
                </div>
                <div className="audio-upload-title">
                    <h1 contenteditable="true">Audio Title</h1>
                </div>
                <div className="audio-file-upload">
                    <p>Upload your audio file</p>
                    <div className="file-upload-box"></div>
                </div>
            </main>
        </div>
    )
}