import '../css/Sidebar.css';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSidebar } from "../contexts/SidebarContext";
import { useUser } from "../contexts/UserContext";

import AudioStatus from "./AudioStatus";
import shrinkedTitle from "./ShrinkedAudioTitle";
import useFetchAudios from '../hooks/FetchHook';

import Tooltip from "@mui/material/Tooltip";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function Sidebar() {
  const { isOpen, toggleOpen } = useSidebar();
  const location = useLocation();
  const { user, userLoading } = useUser();

  const [dialogOpen, setDialogOpen] = useState(false);

  const { audios, loading, error, isLoggedIn } = useFetchAudios();

  function handleLogout() {
    localStorage.removeItem("access_token");
    window.location.reload();
  }

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

      <aside className={`sidebar ${isOpen ? "" : "shown"}`}>
        <header className="sidebar-header">
          <div className="profile-part sidebar-link">
            <div className="pfp"></div>
            <span>{userLoading ? "Loading..." : user?.username}</span>
            <button onClick={toggleOpen}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/>
              </svg>
            </button>
          </div>

          <Tooltip title="Search for audios..." placement="left">
            <Link to="/" className="sidebar-link" onClick={() => setDialogOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
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
                <Skeleton 
                  width={100}
                  height={14}
                  style={{ borderRadius: '20px' }}
                  baseColor="#292929"
                  highlightColor="#383838ff"
                />
              ) : error ? (
                <p>{error}</p>
              ) : audios.length === 0 ? (
                <div className="sidebar-link">No audios found</div>
              ) : (
                <>
                  <div className="audios-names-title">
                    <Tooltip title="Your audios name list" placement="left">
                      <span>Audio names</span>
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
                        {shrinkedTitle(audio)}
                      </span>
                      <button className="audio-more-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                          <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                        </svg>
                      </button>
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
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
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
          <button onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
            </svg>
          </button>
        </footer>
      </aside>    
    </>
  );
}
