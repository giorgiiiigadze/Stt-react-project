// Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import '../css/Header.css';

import { useSidebar } from "../contexts/SidebarContext";
import AudioStatus from '../components/AudioStatus';

import Tooltip from '@mui/material/Tooltip';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Dropdown } from "./DropdownMenu/Dropdown";
import { DropdownItem } from "./DropdownMenu/DropdownItem";

import { useNavigate } from "react-router-dom";

import '../css/Header.css';

export default function Header({ audio, loading } = {}) {
  const { toggleOpen } = useSidebar();

  const sidebarPosition = localStorage.getItem("sidebar_position")

  const navigate = useNavigate();

  const title = audio?.file_title;
  const status = audio?.status;

  return (
    <header className="container-header">

      <button className="sidebar-button" onClick={toggleOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" className="icon burger-icon">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
        
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" className="icon arrow-icon">
          <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/>
        </svg>
        
      </button>

      {title ? (
        <div className="header-audio-name">
          <AudioStatus status={status} padding={"6"} />
          <span>{title}</span>
        </div>
      ) : loading ? (
        <div className="header-audio-name">
          <Skeleton width={16} height={16} style={{ borderRadius: '4px' }} baseColor="#292929" highlightColor="#515151ff" />
          <Skeleton width={100} height={6} style={{ borderRadius: '12px' }} baseColor="#292929" highlightColor="#515151ff" />
        </div>
      ) : null}

      <div style={{display: 'flex'}}>
        <Dropdown
          align="right"
          trigger={({ open }) => (
            <button className="edit-home-page-button sidebar-button" >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M240-400q-33 0-56.5-23.5T160-480q0-33
                23.5-56.5T240-560q33 0 56.5 23.5T320-480
                q0 33-23.5 56.5T240-400Zm240 0q-33 0
                -56.5-23.5T400-480q0-33 23.5-56.5T480-560
                q33 0 56.5 23.5T560-480q0 33-23.5
                56.5T480-400Zm240 0q-33 0-56.5-23.5T640
                -480q0-33 23.5-56.5T720-560q33 0 56.5
                23.5T800-480q0 33-23.5 56.5T720-400Z"/>
              </svg>
            </button>
          )}
          width={200}
        >
          {({ close }) => ( 
            <>
              <DropdownItem onClick={close}>Settings</DropdownItem>
              <DropdownItem onClick={close}>Duplicate</DropdownItem>
              <DropdownItem>
                Logout
              </DropdownItem>
            </>
          )}
        </Dropdown>

        <Tooltip title="Record or upload" placement="bottom">
          <button 
            onClick={() => navigate('/audio_upload')}
            className="edit-home-page-button sidebar-button"
          >
            <svg
              aria-hidden="true"
              role="graphics-symbol"
              viewBox="0 0 20 20"
              className="compose"
              style={{
                width: "22px",
                height: "22px",
                display: "block",
                fill: "#fff",
                flexShrink: 0,
              }}
            >
              <path d="m16.774 4.341-.59.589-1.109-1.11.596-.594a.784.784 0 0 1 1.103 0c.302.302.302.8 0 1.102zM8.65 12.462l6.816-6.813-1.11-1.11-6.822 6.808a1.1 1.1 0 0 0-.236.393l-.289.932c-.052.196.131.38.315.314l.932-.288a.9.9 0 0 0 .394-.236" />
              <path d="M4.375 6.25c0-1.036.84-1.875 1.875-1.875H11a.625.625 0 1 0 0-1.25H6.25A3.125 3.125 0 0 0 3.125 6.25v7.5c0 1.726 1.4 3.125 3.125 3.125h7.5c1.726 0 3.125-1.4 3.125-3.125V9a.625.625 0 1 0-1.25 0v4.75c0 1.036-.84 1.875-1.875 1.875h-7.5a1.875 1.875 0 0 1-1.875-1.875z" />
            </svg>
          </button>
        </Tooltip>
      </div>
    </header>
  );
}
