import { useState, useEffect, useRef } from "react";

import { useAudios } from "../../../contexts/AudioContext";
import { useTranscription } from "../../../hooks/UseTranscription";

import EmptyState from "../../../helper/EmptyState";
import ConfirmDialog from "../../Dialog/ConfrimDialog";
import TranscriptionSkeletons from "../../TranscriptionSkeletons";

import "../../../css/AudioTabs/Tabs/Transcription.css";

export default function Transcription({ audioId }) {
  const {
    transcriptions,
    loading,
    error,
    addTranscription,
    fetchTranscriptions,
  } = useAudios();

  const { startTranscription } = useTranscription();

  const [text, setText] = useState("");
  const [transcriptionDialog, setTranscriptionDialog] = useState(false);

  const textareaRef = useRef(null);

  const transcription = transcriptions.find(
    (t) => String(t.audio) === String(audioId)
  );

  const isProcessing =
    transcription?.status === "PROCESSING" ||
    transcription?.status === "PENDING";

  const isDone = transcription?.status === "DONE";

  useEffect(() => {
    if (!transcription) return;

    if (isProcessing) {
      const interval = setInterval(() => {
        fetchTranscriptions();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isProcessing, transcription?.id]);

  useEffect(() => {
    if (isDone && transcription?.transcribed_text) {
      setText(transcription.transcribed_text);

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px";
        }
      });
    }
  }, [isDone, transcription]);

  async function handleGenerate() {
    try {
      const res = await startTranscription(audioId);
      const data = res.data ?? res;

      addTranscription({
        id: data.id,
        audio: data.audio,
        transcribed_text: data.transcribed_text,
        transcription_tag: data.transcription_tag,
        status: data.status,
      });

      setTranscriptionDialog(false);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <p className="transcription-loading">Loading transcription...</p>;
  }

  if (error) {
    return <p className="transcription-error">{error}</p>;
  }

  return (
    <>
      {transcriptionDialog && (
        <ConfirmDialog
          open={transcriptionDialog}
          title="Generate transcription?"
          description="This will generate a transcription for this audio using automatic speech recognition."
          confirmText="Generate transcription"
          cancelText="Cancel"
          danger
          onConfirm={handleGenerate}
          onCancel={() => setTranscriptionDialog(false)}
        />
      )}

      {isProcessing && <TranscriptionSkeletons />}

      {transcription && isDone && (
        <div className="transcription-container">
          <div className="transcription-item">
            <div className="transcription-tag">
              <span>@{transcription.transcription_tag}</span>

              <div className="transcription-details">
                <div className="detail-item">
                  <span className="detail-label">Language</span>
                  <span className="detail-badge language">English</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Total Chars</span>
                  <span className="detail-value">{text.length}</span>
                </div>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              className="transcription-text textarea-clean"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
          </div>
        </div>
      )}

      {!transcription && (
        <EmptyState
          position="start"
          marginTop={40}
          svg={(
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width='150px'
                height='150px'
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
                    stroke="#ffffff83"
                    strokeWidth="30"
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
                    stroke="#ffffff83"
                    strokeWidth="30"
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
                    stroke="#ffffff83"
                    strokeWidth="30"
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
          title="No transcription found"
          primaryText="Generate transcription"
          secondaryText="How transcription works"
          primaryOnClick={() => setTranscriptionDialog(true)}
          secondaryLink="/audio_upload"
        />
      )}
    </>
  );
}
