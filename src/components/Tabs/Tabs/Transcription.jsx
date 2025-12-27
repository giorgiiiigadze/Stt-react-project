import { Link } from "react-router-dom";
import { useAudios } from "../../../contexts/AudioContext";

import EmptyState from "../../../helper/EmptyState";
import ConfirmDialog from "../../Dialog/ConfrimDialog";

import "../../../css/AudioTabs/Tabs/Transcription.css";
import { useState } from "react";

export default function Transcription({ audioId }) {
  const { transcriptions, loading, error } = useAudios();

  const [transcriptionDialog, setTranscriptionDialog] = useState(false)

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
    <>
    {transcriptionDialog &&
      <ConfirmDialog
            open={transcriptionDialog}
            title="Generate transcription?"
            description="This will generate a transcription for this audio using automatic speech recognition. The process may take a few moments."
            confirmText="Generate transcription"
            cancelText="Cancel"
            danger
            onConfirm={() => console.log("Confrim")}
            onCancel={() => setTranscriptionDialog(false)}
          />    
    }

      {!transcription ? (

        <EmptyState
          position={'start'}
          marginTop={40}
          svg={(
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width='130px'
              height='130px'
              viewBox="0 0 1891 1891"
              fill="none"
              style={{ rotate: '80deg'}}
            >
              <foreignObject x="158" y="81" width="2561.72" height="2337.28">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    clipPath: "url(#bgblur_0_3_2276_clip_path)",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </foreignObject>

              <g data-figma-bg-blur-radius="10">
                <rect
                  x="6.39979"
                  y="11.3064"
                  width="1145.08"
                  height="1145.08"
                  rx="50"
                  transform="matrix(0.981627 0.190809 -0.341649 0.939828 570.027 90.4592)"
                  stroke="white"
                  strokeWidth="40"
                />
              </g>

              <foreignObject x="164.115" y="290.452" width="1561.72" height="1337.28">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    clipPath: "url(#bgblur_1_3_2276_clip_path)",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </foreignObject>

              <g data-figma-bg-blur-radius="10">
                <rect
                  x="6.39979"
                  y="11.3064"
                  width="1145.08"
                  height="1145.08"
                  rx="50"
                  transform="matrix(0.981627 0.190809 -0.341649 0.939828 576.142 299.911)"
                  stroke="white"
                  strokeWidth="40"
                />
              </g>

              <foreignObject x="173.177" y="473.723" width="1561.72" height="1337.28">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    clipPath: "url(#bgblur_2_3_2276_clip_path)",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </foreignObject>

              <g data-figma-bg-blur-radius="10">
                <rect
                  x="6.39979"
                  y="11.3064"
                  width="1145.08"
                  height="1145.08"
                  rx="50"
                  transform="matrix(0.981627 0.190809 -0.341649 0.939828 585.204 483.182)"
                  stroke="white"
                  strokeWidth="40"
                />
              </g>

              <defs>
                <clipPath
                  id="bgblur_0_3_2276_clip_path"
                  transform="translate(-158 -81)"
                >
                  <rect
                    x="6.39979"
                    y="11.3064"
                    width="1145.08"
                    height="1145.08"
                    rx="50"
                    transform="matrix(0.981627 0.190809 -0.341649 0.939828 570.027 90.4592)"
                  />
                </clipPath>

                <clipPath
                  id="bgblur_1_3_2276_clip_path"
                  transform="translate(-164.115 -290.452)"
                >
                  <rect
                    x="6.39979"
                    y="11.3064"
                    width="1145.08"
                    height="1145.08"
                    rx="50"
                    transform="matrix(0.981627 0.190809 -0.341649 0.939828 576.142 299.911)"
                  />
                </clipPath>

                <clipPath
                  id="bgblur_2_3_2276_clip_path"
                  transform="translate(-173.177 -473.723)"
                >
                  <rect
                    x="6.39979"
                    y="11.3064"
                    width="1145.08"
                    height="1145.08"
                    rx="50"
                    transform="matrix(0.981627 0.190809 -0.341649 0.939828 585.204 483.182)"
                  />
                </clipPath>
              </defs>
            </svg>
          )}
          title="No transcription yet"
          description="This audio hasn’t been transcribed yet. Start a transcription to turn
          speech into searchable, editable text you can review and improve anytime."
          primaryText="Generate transcription"
          secondaryText="How transcription works"
          primaryOnClick={() => setTranscriptionDialog(true)}

          secondaryLink={'/audio_upload'}
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
      )}
    </>
    );

}
