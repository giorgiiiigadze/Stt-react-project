import { useSidebar } from "../contexts/SidebarContext";
import AudioStatus from '../components/AudioStatus';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import '../css/Header.css'



export default function Header({ audio, loading } = {}){

  const { toggleOpen } = useSidebar();

  const title = audio?.file_title;
  const status = audio?.status;

    return (
      <header className="container-header">
        <div style={{display: "flex", alignItems: 'center'}}>
          <button className="sidebar-button" onClick={toggleOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
          </button>
          
          {title ? (
            <button className="header-audio-name" aria-label={`Audio: ${title}`}>
              <AudioStatus status={status} padding={"6"}/>
              <span>{title}</span>
            </button>
          ) : loading ? (
            <button className="header-audio-name" aria-hidden="true">
                <Skeleton 
                    width={16} 
                    height={16}
                    style={{ borderRadius: '12px' }}
                    baseColor="#292929"
                    highlightColor="#515151ff"
                />
                <Skeleton 
                    width={200} 
                    height={10}
                    style={{ borderRadius: '12px' }}
                    baseColor="#292929"
                    highlightColor="#515151ff"
                />

            </button>
          ) : null}

        </div>

        <button className="edit-home-page-button sidebar-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
          </svg>
        </button>
      </header>
    )
}