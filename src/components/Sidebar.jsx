import '../css/Sidebar.css';
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSidebar } from "../contexts/SidebarContext";
import { useUser } from "../contexts/UserContext";
import { useAudios } from '../contexts/AudioContext';
import SearchDialog from './Dialog/SearchDialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";

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
    return savedWidth ? parseInt(savedWidth) : 600;
  });

  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

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
                <ProfilePicture padding={10} borderRadius={4} />
              )}
              width={300}
            >
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
                  <DropdownItem danger onClick={handleLogoutButton}>
                    Logout
                  </DropdownItem>
                </>
              )}
            </Dropdown>
            
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
              <span>Create New</span>
            </Link>
          </Tooltip>
          <Tooltip title="Every audio details page" placement="left">
            <Link to="/audios" className={`sidebar-link ${location.pathname.startsWith("/audios") ? "active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>
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
                      <Skeleton
                        width={100}
                        height={8}
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
                        height={8}
                        style={{ borderRadius: '4px' }}
                        baseColor="#292929"
                        highlightColor="#515151ff"
                      />          
                    </div>
                  ))}

                  <div className="audios-names-title">
                      <Skeleton
                        width={100}
                        height={8}
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
                <div className="error-container"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-ban-icon lucide-ban"><path d="M4.929 4.929 19.07 19.071"/><circle cx="12" cy="12" r="10"/></svg>{error}</div>
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
