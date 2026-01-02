import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ShowOnce from "../components/showOnce";

import "../css/RecordAudio.css";

export default function RecordAudioPage() {
    const [isRecording, setIsRecording] = useState(false)
    const [isMicOn, setIsMicOn] = useState(true)

    const navigate = useNavigate();

    const [showVolumeMenu, setShowVolumeMenu] = useState(false);
    const [volume, setVolume] = useState(1);

    return (
        <div className="record-page">
            <div className="record-page-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                </button>
            </div>

            <main className="record-page-main">
                
                <div className="recording-container">
                    
                </div>

                <div className="recorded-audios-container">

                </div>
            </main>

            <div className="action-bar">
                <div className="action-item">
                    <button
                    className="action-btn primary-btn"
                    disabled={!isMicOn}
                    onClick={() => setIsRecording(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="10" cy="10" r="4" fill="currentColor" />
                        </svg>
                        <span>Record</span>
                    </button>
                    <span className="label">Start</span>
                </div>

                <div className="action-item">
                    <button className="action-btn" onClick={() => setIsMicOn(!isMicOn)}>
                        {isMicOn ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic-icon lucide-mic"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg>
                        ): (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f25757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic-off-icon lucide-mic-off"><path d="M12 19v3"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M16.95 16.95A7 7 0 0 1 5 12v-2"/><path d="M18.89 13.23A7 7 0 0 0 19 12v-2"/><path d="m2 2 20 20"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/></svg>
                        )}
                    </button>
                    <span className="label">Mic</span>
                </div>
                <ShowOnce
                    storageKey="record_volume_change_v1"
                    text='
                            Change the volume of your voice while
                            recording audio to find the perfect balance 
                            and make sure your recording is clear and easy to understand.
                        '
                    position="top">
                    <div className="action-item volume-wrapper" onClick={() => setShowVolumeMenu(prev => !prev)}>
                        <button className="action-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-volume-2">
                                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
                                <path d="M16 9a5 5 0 0 1 0 6"/>
                                <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
                            </svg>
                        </button>
                        <span className="label">Volume</span>

                        {showVolumeMenu && (
                            <div className="volume-menu">
                                <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                                className="volume-slider"
                                />
                            </div>
                        )}
                    </div>
                </ShowOnce>

                <div className="action-item">
                    <button className="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
                    </button>
                    <span className="label">Timer</span>
                </div>

                <div className="action-item">
                    <button className="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>
                    </button>
                    <span className="label">Waves</span>
                </div>

                <div className="action-item">
                    <button className="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
                    </button>
                    <span className="label">Comments</span>
                </div>

                <div className="action-item">
                    <button className="action-btn">
                        <svg
                        aria-hidden="true"
                        role="graphics-symbol"
                        viewBox="0 0 20 20"
                        style={{ width: "22px", height: "22px", display: "block", flexShrink: 0 }}
                        fill={"#EC5261"}
                        >
                        <path
                            d="M8.806 8.505a.55.55 0 0 0-1.1 0v5.979a.55.55 0 1 0 1.1 0zM12.294 8.505a.55.55 0 0 0-1.1 0v5.979a.55.55 0 1 0 1.1 0z"
                        />
                        <path
                            d="M6.386 3.925v1.464H3.523a.625.625 0 1 0 0 1.25h.897l.393 8.646A2.425 2.425 0 0 0 7.236 17.6h5.528a2.425 2.425 0 0 0 2.422-2.315l.393-8.646h.898a.625.625 0 1 0 0-1.25h-2.863V3.925c0-.842-.683-1.525-1.525-1.525H7.91c-.842 0-1.524.683-1.524 1.525zM7.91 3.65h4.18c.15 0 .274.123.274.275v1.464H7.636V3.925c0-.152.123-.275.274-.275zm-.9 2.99h7.318l-.39 8.588a1.175 1.175 0 0 1-1.174 1.122H7.236a1.175 1.175 0 0 1-1.174-1.122l-.39-8.589z"
                        />
                        </svg>
                    </button>
                    <span className="label">Discard</span>
                </div>

                <div className="action-item">
                    <button className="action-btn danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save-icon lucide-save"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
                    </button>
                    <span className="label">Save</span>
                </div>
            </div>
        </div>
    );
}
