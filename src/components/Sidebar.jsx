import '../css/Sidebar.css';
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";

import { useSidebar } from "../contexts/SidebarContext";
import { useUser } from "../contexts/UserContext";
import { useAudios } from '../contexts/AudioContext';

import { useToast } from '../contexts/MessageContext';
import { deleteAudio } from '../services/api';

import SearchDialog from './Dialog/SearchDialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import ErrorContainer from '../components/ErrorContainer'

import AudioStatus from "./AudioStatus";
import shrinkedTitle from "./ShrinkedAudioTitle";
import ProfilePicture from './Profile/Pfp';
import ConfirmDialog from './Dialog/ConfrimDialog';

import { Dropdown } from './DropdownMenu/Dropdown';
import { DropdownItem } from './DropdownMenu/DropdownItem';

import Tooltip from "@mui/material/Tooltip";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Sidebar() {
  const { isOpen, toggleOpen } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const savedWidth = localStorage.getItem("sidebar_width");
    return savedWidth ? parseInt(savedWidth) : 280;
  });

  const { addToast } = useToast()
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const [audioToDelete, setAudioToDelete] = useState(null);

  const [lastAudioCount, setLastAudioCount] = useState(5);
  
  const { user, userLoading, logout } = useUser();
  const { audios, loading, error, removeAudio, isLoggedIn } = useAudios(user);
  const [logginOut, setLoggingOut] = useState(false)
  
  function handleConfrimLogout() {
    setLoginDialogOpen(false);
    setLoggingOut(true);
    console.log("Logging Out")

    setTimeout(() => {
      logout();
      navigate("/login", { replace: true });
    }, 600);
  }

  async function handleAudioDelete(audioId) {
    try {
      await deleteAudio(audioId);
      navigate('/')
      removeAudio(audioId);
      addToast("Audio deleted successfully.", "success");
    } catch (error) {
      console.error("Failed to delete audio:", error);
      addToast("Failed to delete audio.", "error");
    }
  }

  useEffect(() => {
    if (!loading && audios?.length) {
      setLastAudioCount(audios.length);
    }
  }, [loading, audios]);

  return (
    <>
      {searchDialogOpen && (
        <SearchDialog
          open={searchDialogOpen}
          onClose={() => setSearchDialogOpen(false)}
        />
      )}

      {loginDialogOpen && (
        <ConfirmDialog
          open={loginDialogOpen}
          title="Are you sure you want to logout?"
          description="You will need to sign in again to access your accounts information"
          confirmText="Logout"
          cancelText="Cancel"
          danger
          onConfirm={handleConfrimLogout}
          onCancel={() => setLoginDialogOpen(false)}
        />
      )}
      
      {deleteDialogOpen && (
        <ConfirmDialog
          open={deleteDialogOpen}
          title="Are you sure you want to delete this audio?"
          description="Deleting this audio may remove associated comments and other information."
          confirmText="Yes, Delete"
          cancelText="Cancel"
          danger
          onConfirm={() => {
            handleAudioDelete(audioToDelete);
            setDeleteDialogOpen(false);
            setAudioToDelete(null);
          }}
          onCancel={() => setDeleteDialogOpen(false)}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? "" : "shown"}`} style={{width: sidebarWidth}}>

        <header className="sidebar-header">
          <div className="profile-part sidebar-link">
            <div className='profile-container'>
              <Dropdown
                align="left"
                trigger={({ open }) => (
                  <ProfilePicture padding={10} borderRadius={4} />
                )}
                width={300}>

                  {({ close }) => (
                    <>
                      <div className="profile-information">
                        <ProfilePicture padding={20} borderRadius={4}/>
                        <div>
                          <div>{user?.username}</div>
                          <div style={{color: '#ada9a3'}}>{user?.email}</div>
                        </div>
                      </div>

                      <DropdownItem onClick={close}>Settings</DropdownItem>
                      <DropdownItem onClick={close}>Duplicate</DropdownItem>
                      <DropdownItem danger onClick={() => setLoginDialogOpen(true)}>
                        Logout
                      </DropdownItem>
                    </>
                  )}
                </Dropdown>
                <span>{user?.username}</span>
            </div>
            <button onClick={toggleOpen}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-left-icon lucide-chevrons-left"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
            </button>
          </div>

          <Tooltip title="Search for audios..." placement="left">
            <Link className="sidebar-link" onClick={() => setSearchDialogOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
              <span>Search</span>
            </Link>
          </Tooltip>

          <Tooltip title="Home page" placement="left">
            <Link to="/" className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              <span>Home</span>
            </Link>
          </Tooltip>

          <Tooltip title="Create new audio" placement="left">
            <Link to="/audio_upload" className={`sidebar-link ${location.pathname.startsWith("/audio_upload") ? "active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-plus-icon lucide-file-plus"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M9 15h6"/><path d="M12 18v-6"/></svg>
              <span>Upload</span>
            </Link>
          </Tooltip>
          <Tooltip title="Record new audio" placement="left">
            <Link to="/record_audio" className={`sidebar-link ${location.pathname.startsWith("/record_audio") ? "active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="10" cy="10" r="4" fill="currentColor" />
              </svg>
              <span>Record</span>
            </Link>
          </Tooltip>
          <Tooltip title="Every audio details page" placement="left">
            <Link to="/audios" className={`sidebar-link ${location.pathname.startsWith("/audios") ? "active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-inbox-icon lucide-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>    
              <span>Inbox</span>
            </Link>
          </Tooltip>
        </header>

        <section className="audio-names">
          {isLoggedIn && (
            <>
              {loading ? (
                <>
                  <div className="audios-names-title">
                    <Skeleton
                      width={100}
                      height={7}
                      style={{ borderRadius: '4px' }}
                      baseColor="#292929"
                      highlightColor="#515151ff"
                    /> 
                  </div>
                  {[...Array(3)].map((_, index) => (
                    <div className='audio-nam sidebar-link' key={index}>
                      <Skeleton
                        width={16}
                        height={16}
                        style={{ borderRadius: '4px' }}
                        baseColor="#292929"
                        highlightColor="#515151ff"
                      /> 
                      <Skeleton
                        width={160}
                        height={7}
                        style={{ borderRadius: '4px' }}
                        baseColor="#292929"
                        highlightColor="#515151ff"
                      />          
                    </div>
                  ))}

                  <div className="audios-names-title">
                      <Skeleton
                        width={100}
                        height={7}
                        style={{ borderRadius: '4px' }}
                        baseColor="#292929"
                        highlightColor="#515151ff"
                      /> 
                  </div>
                  {[...Array(lastAudioCount)].map((_, index) => (
                    <div className='audio-nam sidebar-link' key={index}>
                      <Skeleton
                        width={16}
                        height={16}
                        style={{ borderRadius: '4px' }}
                        baseColor="#292929"
                        highlightColor="#515151ff"
                      /> 
                      <Skeleton
                        width={160}
                        height={7}
                        style={{ borderRadius: '4px' }}
                        baseColor="#292929"
                        highlightColor="#515151ff"
                      />          
                    </div>
                  ))}
                </>
                
              )
              : error ? (
                ErrorContainer(error)
              ) : audios.length === 0 ? (
                <div className="sidebar-link"><span>Your workspace is empty</span></div>
              ) : (
                <>
                  {audios.filter(audio => audio.favorite).length > 0 &&
                    <>
                      <div className="audios-names-title">
                        <Tooltip title="Your audios name list" placement="left">
                          <span style={{color: '#ffffffb9'}}>Favourited Audios</span>
                        </Tooltip>
                      </div>
                      {audios.filter(audio => audio.favorite).map(audio => (
                        <Link
                          to={`/audio/${audio.id}`}
                          className={`audio-name sidebar-link ${location.pathname === `/audio/${audio.id}` ? "active" : ""}`}
                          key={audio.id}
                        >
                          <span>
                            <AudioStatus status={audio.status} padding={"8"} />
                            {shrinkedTitle(audio, 25)}
                          </span>

                          <Dropdown
                            align="left"
                            trigger={({ open }) => (
                              <button className="audio-more-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                  <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                                </svg>
                              </button>
                            )}
                            width={200}
                          >
                            {({ close }) => ( 
                              <>
                                <DropdownItem onClick={close}>Duplicate</DropdownItem>
                                <DropdownItem onClick={close}>Add to favourites</DropdownItem>
                                <DropdownItem onClick={close}>Edit</DropdownItem>
                                <DropdownItem danger onClick={() => {
                                  setAudioToDelete(audio.id);
                                  setDeleteDialogOpen(true);
                                }}>
                                  Move to trash
                                </DropdownItem>

                              </>
                            )}
                          </Dropdown>
                        </Link>
                      ))}    
                    </>
                  }

                  <div className="audios-names-title">
                    <Tooltip title="Your audios name list" placement="left">
                      <span style={{color: '#ffffffb9'}}>Uploaded Audios</span>
                    </Tooltip>
                  </div>
                  {audios.map(audio => (
                    <Link
                      to={`/audio/${audio.id}`}
                      className={`audio-name sidebar-link ${location.pathname === `/audio/${audio.id}` ? "active" : ""}`}
                      key={audio.id}
                    >
                      <span>
                        <AudioStatus status={audio.status} padding={"8"} />
                        {shrinkedTitle(audio, 20)}
                      </span>
                      <Dropdown
                        align="left"
                        trigger={({ open }) => (
                          <button className="audio-more-btn" >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                              <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                            </svg>
                          </button>
                        )}
                        width={200}
                      >
                        {({ close }) => ( 
                          <>
                            <DropdownItem onClick={close}>Settings</DropdownItem>
                            <DropdownItem onClick={close}>Duplicate</DropdownItem>
                              <DropdownItem danger onClick={() => {
                                setAudioToDelete(audio.id);
                                setDeleteDialogOpen(true);
                              }}>
                              Move to trash
                            </DropdownItem>
                          </>
                        )}
                      </Dropdown>
                    </Link>
                  ))}

                </>
              )}
            </>
          )}
        </section>

        <div className="side-links">

          <Tooltip title="Modify your workspace" placement="left">
            <Link to="/" className="sidebar-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
              <span>settings</span>
            </Link>
          </Tooltip>

          <Tooltip title="Restore deleted audios" placement="left">
            <Link to="/" className="sidebar-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              <span>Trash</span>
            </Link>
          </Tooltip>
        </div>

        <footer className="sidebar-footer">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
            </svg>
          </button>
        </footer>
      </aside>    
    </>
  );
}
