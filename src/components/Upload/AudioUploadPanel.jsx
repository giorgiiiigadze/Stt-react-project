import { useState, useRef } from "react";
import "../../css/Upload/AudioUploadPanel.css";

const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/x-m4a",
  "audio/mp4",
];

const MAX_FILE_SIZE_MB = 50;

export default function AudioUploadPanel({ onUpload }) {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file) => {
    if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
      return "Only audio files are allowed";
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      return `Max file size is ${MAX_FILE_SIZE_MB}MB`;
    }

    return null;
  };

  const handleFileSelect = (selectedFile) => {
    const errorMsg = validateFile(selectedFile);
    if (errorMsg) {
      setError(errorMsg);
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
    onUpload?.(selectedFile);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);

    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFileSelect(dropped);
  };

  return (
    <div className="upload-panel-container">
      <div
        className={`upload-dropzone ${dragOver ? "drag-over" : ""} ${error ? "error" : ""}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <p>Selected file: {file.name}</p>
        ) : (
          <div className="upload-dropzone-div" >
            <span>
              <svg
                width="69"
                height="72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#a)">
                  <path
                    d="M26.405 8.21c.06-.13.13-.26.2-.38.16-.31.33-.61.51-.9.08-.13.15-.25.23-.38.22-.33.44-.66.68-.97.04-.05.08-.11.12-.17.28-.36.57-.69.88-1.02.08-.09.17-.17.26-.26.23-.23.47-.46.71-.67.11-.09.21-.18.32-.27.27-.22.54-.42.82-.61.08-.06.16-.12.24-.17.26-.17.53-.32.81-.47.14-.08.26-.16.4-.23.41-.21.84-.4 1.27-.56l-13.92 5.19c-.43.16-.86.35-1.27.56-.14.07-.27.16-.4.23-.25.14-.5.27-.74.42-.02.02-.05.04-.07.05-.08.05-.16.11-.24.17-.28.19-.55.4-.82.61-.11.09-.21.18-.32.27-.24.21-.48.44-.71.67-.09.09-.18.17-.26.26-.3.32-.6.66-.88 1.02-.04.05-.08.11-.12.17a13.928 13.928 0 0 0-.91 1.34c-.18.29-.35.59-.51.9-.07.13-.14.25-.2.38-.21.43-.13.27-.31.73"
                    stroke="#2783de"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M56.155 51.7l-17.09-3.93-9.77-2.24c-5.7-1.31-10.64-6.41-13.08-12.75-1.02-2.66-1.6-5.55-1.61-8.46-.01-5.97 2.38-10.7 6.07-13.09.65-.42 1.34-.77 2.06-1.04l-13.92 5.19c-.72.27-1.41.62-2.06 1.04-3.69 2.39-6.08 7.12-6.06 13.09 0 2.91.58 5.8 1.61 8.46 2.43 6.34 7.38 11.44 13.08 12.75l9.77 2.24 17.09 3.93c1.94.45 3.77.32 5.4-.29l13.92-5.19c-1.63.61-3.46.74-5.4.29h-.01z"
                    fill="#2783de"
                  />
                  <path
                    d="M58.395 22.75c-1.12-10.48-8.3-20.01-16.99-22.01-6.98-1.6-12.96 2.11-15.61 8.8-6.44.4-11.21 6.36-11.19 14.78.02 9.86 6.59 19.35 14.68 21.21l9.77 2.24v-5.43l4.88 1.12v-5.43l4.88 1.12v5.43l-4.88-1.12v5.43l12.21 2.81c6.74 1.55 12.19-3.85 12.18-12.07-.01-7.25-4.29-14.28-9.94-16.88h.01zm-9.06 8.9-5.39-7.79v14.18l-4.88-1.12V22.74l-5.36 5.31-3.46-5 7.65-7.59c1.87-1.85 4.83-1.76 7.33 1.85l7.56 10.93-3.44 3.41h-.01zM4.895 42.95l12.13-4.52c-.77-1.14-1.46-2.36-2.05-3.65L2.845 39.3c.58 1.29 1.27 2.51 2.04 3.65h.01zM34.185 52.09l4.88 1.12v5.43l-4.88-1.12v-5.43zM39.065 66.43l3.45.79v3.84l-3.45-.79v-3.84z"
                    fill="#fff"
                  />
                  <path
                    d="M58.395 22.75c-1.11-10.48-8.3-20.01-16.99-22.01-6.98-1.6-12.96 2.11-15.61 8.8-6.44.4-11.21 6.36-11.19 14.78.02 9.86 6.59 19.35 14.68 21.21l9.77 2.24 4.88 1.12 12.22 2.81c6.74 1.55 12.19-3.85 12.18-12.07-.01-7.25-4.29-14.28-9.94-16.88z"
                    stroke="#181B1F"
                    strokeMiterlimit="10"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" transform="translate(.315)" d="M0 0h68.4v71.06H0z" />
                  </clipPath>
                </defs>
              </svg>
            </span>

            <button className="upload-button">
              Upload File
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {error && <p className="upload-error" style={{color: '#EC5261'}}>{error}</p>}

    </div>
  );
}
