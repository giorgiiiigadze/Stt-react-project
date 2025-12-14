import '../css/Sidebar.css';
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSidebar } from "../contexts/SidebarContext";
import { useUser } from "../contexts/UserContext";
import { useAudios } from '../contexts/AudioContext';
import useMediaQuery from '@mui/material/useMediaQuery';

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

  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const savedWidth = localStorage.getItem("sidebar_width");
    return savedWidth ? parseInt(savedWidth) : 600;
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const [lastAudioCount, setLastAudioCount] = useState(6);

  const isMobile = useMediaQuery("(max-width: 430px)")
  const { user, userLoading } = useUser();
  const { audios, loading, error, isLoggedIn } = useAudios(user);
  
  // const favouritedAudiosLength = audios.filter(audio => audio.favorite).length
  
  function handleLogout() {
    localStorage.removeItem("access_token");
    window.location.reload();
  }

  function handleLogoutButton(){
    setLoginDialogOpen(true)
  }
  // Add the return to old state part later
  // useEffect(() => {
  //   if (isMobile && isOpen) {
  //     toggleOpen(false);
  //   }
  // }, [isMobile]);

  
  useEffect(() => {
    if (!loading && audios?.length) {
      setLastAudioCount(audios.length);
    }
  }, [loading, audios]);

  return (
    <>
      {dialogOpen && (
        <div className="search-dialog">
          <div>
            <h2>Dialog Title</h2>
            <p>This is a simple dialog in React.</p>
            <button onClick={() => setDialogOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {loginDialogOpen && (
        <ConfirmDialog
          open={loginDialogOpen}
          title="Are you sure you want to logout?"
          description="You will need to sign in again to access your accounts information"
          confirmText="Logout"
          cancelText="Cancel"
          danger
          onConfirm={handleLogout}
          onCancel={() => setLoginDialogOpen(false)}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? "" : "shown"}`} style={{width: sidebarWidth}}>

        <header className="sidebar-header">
          <div className="profile-part sidebar-link">
            <Dropdown
              align="left"
              trigger={({ open }) => (
                <button className="profile-dropdown">
                  <ProfilePicture padding={10} />
                  <span>{user?.username}</span>
                </button>
              )}
              width={300}
            >
              {({ close }) => (
                <>
                  <div className="profile-information">
                    <ProfilePicture padding={20} />
                    <div>
                      <div>{user?.username}</div>
                      <div style={{color: '#ada9a3'}}>{user?.email}</div>
                    </div>
                  </div>

                  <DropdownItem onClick={close}>Settings</DropdownItem>
                  <DropdownItem onClick={close}>Duplicate</DropdownItem>
                  <DropdownItem danger onClick={handleLogoutButton}>
                    Logout
                  </DropdownItem>
                </>
              )}
            </Dropdown>
            
            <button onClick={toggleOpen}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/>
              </svg>
            </button>
          </div>

          <Tooltip title="Search for audios..." placement="left">
            <Link className="sidebar-link" onClick={() => setDialogOpen(true)}>
              <svg
                aria-hidden="true"
                role="graphics-symbol"
                viewBox="0 0 20 20"
                className="magnifyingGlass"
                style={{
                  width: "22px",
                  height: "22px",
                  display: "block",
                  flexShrink: 0,
                }}>
                <path d="M8.875 2.625a6.25 6.25 0 1 0 3.955 11.09l3.983 3.982a.625.625 0 1 0 .884-.884l-3.983-3.982a6.25 6.25 0 0 0-4.84-10.205m-5 6.25a5 5 0 1 1 10 0 5 5 0 0 1-10 0" />
              </svg>

              <span>Search</span>
            </Link>    
          </Tooltip>

          <Tooltip title="Home page" placement="left">
            <Link to="/" className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
              </svg>
              <span>Home</span>
            </Link>
          </Tooltip>

          <Tooltip title="Create new audio" placement="left">
            <Link to="/audio_upload" className={`sidebar-link ${location.pathname.startsWith("/audio_upload") ? "active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
              <span>Create New</span>
            </Link>
          </Tooltip>
          <Tooltip title="Every audio details page" placement="left">
            <Link to="/audios" className={`sidebar-link ${location.pathname.startsWith("/audios") ? "active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z"/>
              </svg>
              <span>Audios</span>
            </Link>
          </Tooltip>
        </header>

        <section className="audio-names">
          {isLoggedIn && (
            <>
              {loading ? (
                <>
                  <div className="audios-names-title">
                    <Tooltip title="Your audios name list" placement="left">
                      <span>Uploaded Audios</span>
                    </Tooltip>
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
                        height={8}
                        style={{ borderRadius: '4px' }}
                        baseColor="#292929"
                        highlightColor="#515151ff"
                      />          
                    </div>
                  ))}

                  <div className="audios-names-title">
                    <Tooltip title="Your audios name list" placement="left">
                      <span>Uploaded Audios</span>
                    </Tooltip>
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
                        height={8}
                        style={{ borderRadius: '4px' }}
                        baseColor="#292929"
                        highlightColor="#515151ff"
                      />          
                    </div>
                  ))}
                </>
                
              )
              : error ? (
                <p>{error}</p>
              ) : audios.length === 0 ? (
                <div className="sidebar-link"><span>No audios found</span></div>
              ) : (
                <>
                {audios.filter(audio => audio.favorite).length > 0 &&
                <>
                  <div className="audios-names-title">
                    <Tooltip title="Your audios name list" placement="left">
                      <span style={{color: '#fff'}}>Favourited Audios</span>
                    </Tooltip>
                  </div>
                  {audios.filter(audio => audio.favorite).map(audio => (
                    <Link
                      to={`/audios/${audio.id}`}
                      className={`audio-name sidebar-link ${location.pathname === `/audios/${audio.id}` ? "active" : ""}`}
                      key={audio.id}
                    >
                      <span>
                        <AudioStatus status={audio.status} padding={"8"} />
                        {shrinkedTitle(audio, 20)}
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
                            <DropdownItem danger onClick={handleLogoutButton}>
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
                      <span style={{color: '#fff'}}>Uploaded Audios</span>
                    </Tooltip>
                  </div>
                  {audios.map(audio => (
                    <Link
                      to={`/audios/${audio.id}`}
                      className={`audio-name sidebar-link ${location.pathname === `/audios/${audio.id}` ? "active" : ""}`}
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
                            <DropdownItem danger onClick={handleLogoutButton}>
                              Logout
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
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
              </svg>
              <span>settings</span>
            </Link>
          </Tooltip>

          <Tooltip title="Restore deleted audios" placement="left">
            <Link to="/" className="sidebar-link">
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
          <button onClick={setLoginDialogOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
            </svg>
          </button>
        </footer>
      </aside>    
    </>
  );
}
