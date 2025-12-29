import { useState, useRef, useEffect } from "react";

import LiveWaves from "../../helper/LiveWaves";

import ExpandedLayout from "./Expanded";

import "../../css/Record/RecordMenu.css";

export default function RecordMenu() {
  const [isRecording, setIsRecording] = useState(false)

  const [audioBlob, setAudioBlob] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

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

      {open && (
        <div
          className="record-backdrop"
          onClick={() => {
            setOpen(false);
            setIsExpanded(false);
          }}
        ></div>
      )}

      {open && (
        <div ref={menuRef} className={`record-container`}>
              <ExpandedLayout
                isRecording={isRecording}
                audioBlob={audioBlob}
                setIsExpanded={setIsExpanded}
                setOpen={setOpen}
                startRecording={startRecording}
                stopRecording={stopRecording}
                discardRecording={discardRecording}
                saveRecording={saveRecording}
                liveWaves={<LiveWaves isRecording={isRecording} />}
              />            
          
        </div>
      )}

      <button
        ref={buttonRef}
        className="record-button"
        onClick={() => setOpen((v) => !v)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </button>
    </div>
  );
}
