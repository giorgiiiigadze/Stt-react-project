import { useState } from 'react';
import '../../css/Upload/UploadDialog.css';

import { uploadAudio } from '../../services/api';
import AudioUploadPanel from '../Upload/AudioUploadPanel';
import { useToast } from '../../contexts/MessageContext';

export default function UploadDialog({ setShowUploadDialog }) {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const { addToast } = useToast()
  const [error, setError] = useState(false)

  const onSubmit = async () => {
    console.log("Submitted the upload information");

    if (!file) {
      addToast("Please select an audio file!", "error");
      setError(true);
      return;
    }

    if (!title.trim()) {
      addToast("Please enter a title!", "error");
      setError(true);
      return;
    }

    try {
      await uploadAudio(title, file);
      addToast("Audio uploaded successfully!");
      setError(false);
      setFile(null);
      setTitle("");
    } catch (err) {
      console.error(err);
      addToast(
        err?.data?.detail || "Failed to upload audio. Please try again."
      );
      setError(true);
    }
  };


  return (
    <div className="dialog-backdrop" onClick={() => setShowUploadDialog(false)}>
      <div className="dialog-upload-box" onClick={(e) => e.stopPropagation()}>
        <header className="dialog-upload-header">
          <button
            onClick={() => setShowUploadDialog(false)}
            className="dialog-close-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </header>
        
        <main className="dialog-upload-section">
          <div>
            <article>Upload or drag your audio files</article>
            <p>For best quality, upload MP3 files under 10MB and ensure they are properly normalized.</p>
          </div>

          <input
            type="text"
            placeholder="Enter audio title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="upload-title-input"
          />

          <AudioUploadPanel onUpload={setFile} />

        </main>

        <div className="dialog-upload-buttons">
          <button
            className="upload-btn dialog-btn"
            onClick={onSubmit}
          >
            Submit Audio
          </button>
        </div>
      </div>
    </div>
  );
}
