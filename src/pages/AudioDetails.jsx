import '../css/AudioDetails.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import Header from "../components/Header";

import { useAudios } from '../contexts/AudioContext';
import { deleteAudio } from '../services/api';

import AudioCustomPlayer from '../components/Player/AudioCustomPlayer';
import AudioStatus from '../components/AudioStatus';
import AudioTabs from '../components/Tabs/AudioTabs';
import ConfirmDialog from '../components/Dialog/ConfrimDialog';

import Tooltip from '@mui/material/Tooltip';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// import AudioWaveformPlayer from '../components/Player/AudioWaveformPlayer';
import { useToast } from '../contexts/MessageContext';
import { editAudioTitle } from '../services/api';

export default function AudioDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTranscriptionTag, setShowTranscriptionTag] = useState(false)
  const [activeTab, setActiveTab] = useState("Transcription");

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [isSavingTitle, setIsSavingTitle] = useState(false);

  const { audios, transcriptions, loading, error, isLoggedIn } = useAudios();
  const { addToast } = useToast()

  const audio = audios?.find(a => String(a.id) === String(id));
  const transcription = transcriptions?.find(
    t => String(t.audio) === String(audio?.id)
  );

  const handleSave = async () => {
    if (!isEditingTitle) {
      addToast("Enable edit mode before saving", "error");
      return;
    }

    if(!newTitle.trim()) {
      addToast("Audio title can't be more than 6 characters", 'error')
      return
    }

    if(newTitle === audio.file_title) {
      addToast("Enter new title or cencel the operation", 'error')
      return
    }

    if(newTitle.length > 35){
      addToast("The new audio title must be fewer than 35 characters", 'error')
      return
    }

    try {
      setIsSavingTitle(true)
      const updatedAudio = await editAudioTitle(audio.id, newTitle)

      audio.file_title = updatedAudio.file_title
      addToast("Title updated successfully")
      setIsEditingTitle(false)
    } catch (err) {
      console.error(err)
      if (err.response?.status === 429) {
        addToast(
          "You can edit the title only 5 times per minute. Please wait and try again.",
          "error"
        );
        setIsEditingTitle(false);
        return;
      }

      addToast("Failed to update title", 'error')
    } finally {
      setIsSavingTitle(false)
    }
  };


  const handleDelete = async (audioId) => {
    try {
      await deleteAudio(audioId);
      addToast("Audio deleted successfully")
      navigate('/')
    } catch (error) {
      console.error("Failed to delete audio:", error);
    }
  };

  return (
    <>
    <Header audio={audio} loading={loading} />

    <div className="audio-details-container">

      {!isLoggedIn ? (
        <p>Not logged in</p>
      ) : loading ? (
        <main className='audio-details-main'>
            <div className="audio-upper-section">
            </div>
            <div className="audio-title">

              <Skeleton 
                  width={24} 
                  height={24}
                  style={{ borderRadius: '4px' }}
                  baseColor="#292929"
                  highlightColor="#515151ff"
              />
              <Skeleton 
                  width={500} 
                  height={16}
                  style={{ borderRadius: '12px' }}
                  baseColor="#292929"
                  highlightColor="#515151ff"
              />
            </div>
            <div className="custom-audio-player-wrapper">
            </div>  
        </main>
      ) : error ? (
        <p>{error}</p>
      ) : !audio ? (
        <p>Audio not found</p>
      ) : (
        <>
          <main className='audio-details-main'>
            <div className="audio-upper-section">
             <button onClick={() => setShowTranscriptionTag(!showTranscriptionTag)}>
              { showTranscriptionTag ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
                  </svg>
                  <span>Hide transcription tag</span>
                </>
                )
                : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                  </svg>
                  <span>Show transcription tag</span>
                </>
                )
              }
              </button>
              <Tooltip title="Enable Edit Mode" placement="top">
                <button onClick={() => { setNewTitle(audio.file_title); setIsEditingTitle(!isEditingTitle);}}>
                  <svg
                    aria-hidden="true"
                    role="graphics-symbol"
                    viewBox="0 0 16 16"
                    className="pencilLineSmall"
                    style={{
                      width: "16px",
                      height: "16px",
                      display: "block",
                      flexShrink: 0,
                      color: "inherit",
                    }}
                  >
                    <path d="M11.243 3.457a.803.803 0 0 0-1.13 0l-.554.552a.075.075 0 0 0 0 .106l1.03 1.03a.075.075 0 0 0 .107 0l.547-.546a.1.1 0 0 0 .019-.032.804.804 0 0 0-.02-1.11m-2.246 1.22a.075.075 0 0 0-.106 0l-6.336 6.326a1.1 1.1 0 0 0-.237.393l-.27.87v.002c-.062.232.153.466.389.383l.863-.267q.221-.061.397-.239l6.332-6.331a.075.075 0 0 0 0-.106zm-3.355 6.898a.08.08 0 0 0-.053.022l-1.1 1.1a.075.075 0 0 0 .053.128h9.06a.625.625 0 1 0 0-1.25z" />
                  </svg>
                </button>
              </Tooltip>
            </div>

            <div className="audio-title">
              <AudioStatus status={audio.status} padding={14} />

              {isEditingTitle ? (
                <div
                  className="title editable"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onInput={(e) => setNewTitle(e.target.textContent)} 
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.currentTarget.blur(); 
                    }
                  }}
                  >
                  {audio.file_title}
                </div>
              ) : (
                <div
                  className="title"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {audio.file_title}
                </div>
              )}
            </div>

            <div className="audio-transcription-tag">
              {showTranscriptionTag && (
                transcription ? (
                  <div>
                    <p>Tag: {transcription?.transcription_tag}</p>
                  </div>
                ) : (
                  <p>Audio has no transcription tag</p>
                )
              )}
                      
            </div>

            <div className="audio-section">
              <AudioTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              <div className='audio-actions' style={{display: 'flex'}}>
                
                <Tooltip title="Delete Audio" placement="top">
                  <button onClick={() => setShowDeleteDialog(true)}>
                    <svg
                      aria-hidden="true"
                      role="graphics-symbol"
                      viewBox="0 0 20 20"
                      style={{ width: "22px", height: "22px", display: "block", flexShrink: 0 }}
                    >
                      <path
                        d="M8.806 8.505a.55.55 0 0 0-1.1 0v5.979a.55.55 0 1 0 1.1 0zM12.294 8.505a.55.55 0 0 0-1.1 0v5.979a.55.55 0 1 0 1.1 0z"
                      />
                      <path
                        d="M6.386 3.925v1.464H3.523a.625.625 0 1 0 0 1.25h.897l.393 8.646A2.425 2.425 0 0 0 7.236 17.6h5.528a2.425 2.425 0 0 0 2.422-2.315l.393-8.646h.898a.625.625 0 1 0 0-1.25h-2.863V3.925c0-.842-.683-1.525-1.525-1.525H7.91c-.842 0-1.524.683-1.524 1.525zM7.91 3.65h4.18c.15 0 .274.123.274.275v1.464H7.636V3.925c0-.152.123-.275.274-.275zm-.9 2.99h7.318l-.39 8.588a1.175 1.175 0 0 1-1.174 1.122H7.236a1.175 1.175 0 0 1-1.174-1.122l-.39-8.589z"
                      />
                    </svg>
                  </button>
                </Tooltip>
                
                <button 
                  style={{ background: isEditingTitle ? "rgb(35, 131, 226)" : "#3f3f3f ", color: '#fff' }}
                  onClick={handleSave} 
                  disabled={isSavingTitle}
                  className="save-btn">
                  {isSavingTitle ? "Saving..." : "Save"}
                </button>
              </div>

            </div>

            <div className="audio-details">
              {activeTab === "Transcription" && (
                <div>Transcription</div>
              )}

              {activeTab === "Waveform" && (
                <div>Waveform</div>
              )}

              {activeTab === "Comments" && (
                <div>Comments</div>
              )}
            </div>
              
            <div className="audio-transcription"></div>
            <div className="audio-comment-list"></div>
            <div className="add-comment"></div>
            
            <div className="custom-audio-player-wrapper">
              <AudioCustomPlayer audio={audio}/>
            </div>

            {showDeleteDialog && (
              <ConfirmDialog
                open={showDeleteDialog}
                title="Are you sure you want to delete this audio?"
                description="Deleting this audio may remove associated comments and other information."
                confirmText="Yes, Delete"
                cancelText="Cancel"
                danger
                onConfirm={() => handleDelete(audio.id)}
                onCancel={() => setShowDeleteDialog(false)}
              />
            )}
          </main>
        </>
      )}
    </div>
    </>
  );
}
