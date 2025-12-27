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

      <div className="header-right-part">
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
      </div>
    </header>
  );
}
