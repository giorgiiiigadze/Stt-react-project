import { useNavigate } from "react-router-dom";

export default function ExpandedLayout({
  isRecording,
  audioBlob,
  setIsExpanded,
  setOpen,
  startRecording,
  stopRecording,
  discardRecording,
  saveRecording,
  liveWaves,
}) {

  const navigate = useNavigate();

  return (
    <>
      <header className="record-container-header">
        <button
          className="open-record-container"
          onClick={() => {
            setIsExpanded(true)
            navigate('/record_audio')
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right">
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
            <path d="m21 3-9 9"/>
            <path d="M15 3h6v6"/>
          </svg>
        </button>

        <button onClick={() => {
          setOpen(false)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-x-icon lucide-x">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </button>
      </header>

      <button
        className={`start-recording-button ${isRecording ? "rotating" : ""}`}
        onClick={isRecording ? stopRecording : startRecording}
        style={{ backgroundColor: isRecording && "#502c29"  }}
      >
        {isRecording ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="#e56458" stroke="#e56458"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-circle-icon lucide-circle">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-mic-icon lucide-mic">
            <path d="M12 19v3"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <rect x="9" y="2" width="6" height="13" rx="3"/>
          </svg>
        )}
      </button>

      {audioBlob && (
        <audio controls src={URL.createObjectURL(audioBlob)} />
      )}

      <div className="waves-container">
        {liveWaves}
      </div>

      <div className="recording-actions">
        {!isRecording && (
          <>
            <button className="clear-btn" onClick={discardRecording}>
                <svg
                aria-hidden="true"
                role="graphics-symbol"
                viewBox="0 0 20 20"
                style={{ width: "22px", height: "22px", display: "block", flexShrink: 0 }}
                fill={audioBlob ? "#EC5261" : "#cccccc"}
                >
                <path
                    d="M8.806 8.505a.55.55 0 0 0-1.1 0v5.979a.55.55 0 1 0 1.1 0zM12.294 8.505a.55.55 0 0 0-1.1 0v5.979a.55.55 0 1 0 1.1 0z"
                />
                <path
                    d="M6.386 3.925v1.464H3.523a.625.625 0 1 0 0 1.25h.897l.393 8.646A2.425 2.425 0 0 0 7.236 17.6h5.528a2.425 2.425 0 0 0 2.422-2.315l.393-8.646h.898a.625.625 0 1 0 0-1.25h-2.863V3.925c0-.842-.683-1.525-1.525-1.525H7.91c-.842 0-1.524.683-1.524 1.525zM7.91 3.65h4.18c.15 0 .274.123.274.275v1.464H7.636V3.925c0-.152.123-.275.274-.275zm-.9 2.99h7.318l-.39 8.588a1.175 1.175 0 0 1-1.174 1.122H7.236a1.175 1.175 0 0 1-1.174-1.122l-.39-8.589z"
                />
                </svg>
            </button>

            <button className="save-btn" onClick={saveRecording}>
              Save
            </button>
          </>
        )}
      </div>
    </>
  );
}
