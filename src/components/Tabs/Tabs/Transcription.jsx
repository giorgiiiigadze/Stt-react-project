import { Link } from "react-router-dom";
import { useAudios } from "../../../contexts/AudioContext";

import EmptyState from "../../../helper/EmptyState";

import "../../../css/AudioTabs/Tabs/Transcription.css";

export default function Transcription({ audioId }) {
  const { transcriptions, loading, error } = useAudios();

  if (loading) {
    return <p className="transcription-loading">Loading transcription...</p>;
  }

  if (error) {
    return <p className="transcription-error">{error}</p>;
  }

  const transcription = transcriptions.find(
    t => String(t.audio) === String(audioId)
  );

    return (
    !transcription ? (
      <EmptyState
        position={'start'}
        marginTop={40}
        svg={(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-captions-icon lucide-captions">
          <rect width="18" height="14" x="3" y="5" rx="2" ry="2"/>
          <path d="M7 15h4M15 15h2M7 11h2M13 11h4"/>
          </svg>)}
        title="No transcription yet"
        description="This audio hasn’t been transcribed yet. Start a transcription to turn
        speech into searchable, editable text you can review and improve anytime."
        primaryText="Generate transcription"
        primaryLink="/transcribe"
        secondaryText="How transcription works"
        secondaryLink="/help/transcription"
      />
    ) : (
        <div className="transcription-container">
        <div className="transcription-item">
            <div className="transcription-label">Transcription tag</div>
            <div className="transcription-tag">
              {transcription.transcription_tag}
            </div>
            {transcription.transcribed_text}
        </div>
        </div>
    )
    );

}
