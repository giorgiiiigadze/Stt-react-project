import '../../css/Upload/UploadDialog.css'
import AudioUploadPanel from '../Upload/AudioUploadPanel'

export default function UploadDialog({ setShowUploadDialog, handleUpload }) {
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
            <AudioUploadPanel />
        </main>

        <div className="dialog-upload-buttons">
          <button onClick={handleUpload} className="upload-btn dialog-btn">
            Submit Audio
          </button>
        </div>
      </div>
    </div>
  );
}
