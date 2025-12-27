import { useState, useRef, useEffect } from "react";

import LiveWaves from "../../helper/LiveWaves";

import "../../css/Record/RecordMenu.css";

export default function RecordMenu() {
  const [isRecording, setIsRecording] = useState(false)

  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [open, setOpen] = useState(() => {
    return localStorage.getItem("record_menu_open") === "true";
  });

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("recordMenuOpen", open);
  }, [open]);

  useEffect(() => {
      const handleClickOutside = (e) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(e.target) &&
            !buttonRef.current.contains(e.target)
        ) {
            setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 44100,
        channelCount: 1,
      },
    });

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
      audioBitsPerSecond: 128000,
    });

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      setAudioBlob(blob);
      stream.getTracks().forEach(track => track.stop());
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const saveRecording = () => {
    if (!audioBlob) return;

    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recording-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const discardRecording = () => {
    setAudioBlob(null);
    audioChunksRef.current = [];
  };


  return (
    <div className="record-wrapper">

      {open ? (
        <div ref={menuRef} className="record-container">
            <header className="record-container-header">
              <button className="open-record-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
              </button>
              
              <button onClick={() => setOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </header>

            <button
                className={`start-recording-button ${isRecording ? "rotating" : ""}`}
                onClick={isRecording ? stopRecording : startRecording}
                style={{ backgroundColor: isRecording ? "#502c29" : "#111"}}
            >
                {isRecording ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#e56458" stroke="#e56458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10"/></svg>
                    )
                    : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic-icon lucide-mic"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg>
                    ) 
                }
            </button>

            {audioBlob && (
              <audio controls src={URL.createObjectURL(audioBlob)} />
            )}
            <div className="waves-container">
                <LiveWaves isRecording={isRecording} />
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

                  <button className="save-btn" onClick={saveRecording} style={{ backgroundColor: audioBlob ? '#2783de' : '#3f3f3f'}}>
                    Save
                  </button>

                </>
              )}
            </div>
        </div>
      ) : (
        <button
          ref={buttonRef}
          className="record-button"
          onClick={() => setOpen((v) => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
      )}
    </div>
  );
}
