import '../css/Home.css'
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import LoginMessage from '../components/LoginMessage';

import AudioBox from '../components/AudioBox';
import AudioLikedBox from '../components/AudioLikedBox';

import EmptyState from '../helper/EmptyState';
import ErrorContainer from '../components/ErrorContainer';

import { useUser } from "../contexts/UserContext";
import { useAudios } from '../contexts/AudioContext';

import Tooltip from '@mui/material/Tooltip';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function Home() {
  const { user, userLoading } = useUser();
  const { audios, loading, error, isLoggedIn } = useAudios();
  
  const favouriteAudios = audios.filter(audio => audio.favorite);

  return (
    <div className="container">
      <Header />

      <main className="container-main">

        {!user && !userLoading && <LoginMessage />}

        {isLoggedIn && (
          <>
            {loading && (
              <div className='upper-text-container'>
                <Skeleton 
                  width={200} 
                  height={8}
                  style={{ borderRadius: '22px' }}
                  baseColor="#292929"
                  highlightColor="#515151ff"
                />
              </div>
            )}

            {!loading && error && ErrorContainer(error)}

            {!loading && !error && (
              <>
                {audios.length > 0 && (
                  <div className='upper-text-container'>
                    <span className='main-text'>
                      {userLoading ? "Loading..." : `${user?.username}s workshop`}
                    </span>
                  </div>
                )}


                <div className="audios-container">
                  {audios.length === 0 ? (
                    <EmptyState
                      position={'center'}
                      marginTop={200}
                      svg={(<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
                      </svg>)}
                      title="No audios uploaded"
                      description="Upload or record your first audio to begin transcribing, organizing,
                      and turning your ideas into something you can easily search, edit, and come back to later."
                      primaryText="Create audio"
                      primaryLink="/audio_upload"
                      secondaryText="Learn more"
                      secondaryLink="/audio_upload"
                    />
                  ) : (

                    <div style={{maxWidth: '100%'}}>
                      <p style={{ 
                        fontSize: '12px', 
                        fontWeight: 500, 
                        color: '#ada9a3',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',

                        }}><svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#ada9a3"><path d="M430-200q38 0 64-26t26-64v-150h120v-80H480v155q-11-8-23.5-11.5T430-380q-38 0-64 26t-26 64q0 38 26 64t64 26ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
                        <span>Your audios</span>
                      </p>
                      <div className="audios-scroll-container">
                        {audios.map(audio => (
                          <AudioBox
                            key={audio.id}
                            audio={audio}
                            width={"150px"}
                            height={"150px"}
                            borderRadius={18}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {favouriteAudios.length > 0 && (
                  <div className="audios-container liked-audios-container">
                    <div style={{ maxWidth: '100%' }}>
                      <p
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#ada9a3',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                        </svg>
                        <span>Your favourited audios</span>
                      </p>

                      <div className="audios-scroll-container">
                        {favouriteAudios.map(audio => (
                          <AudioLikedBox
                            key={audio.id}
                            borderRadius={16}
                            audio={audio}
                            width={"350px"}
                            height={"300px"}
                            favouriteButton={true}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="audio-player-container">
                  <div className="audio-player-controls">
                    <button onClick={() => console.log("Previous")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-first-icon lucide-chevron-first"><path d="m17 18-6-6 6-6"/><path d="M7 6v12"/></svg></button>
                    <button onClick={() => console.log("Play")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg></button>
                    <button onClick={() => console.log("Next")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-last-icon lucide-chevron-last"><path d="m7 18 6-6-6-6"/><path d="M17 6v12"/></svg></button>
                  </div>

                  <div className="audio-waveform-container">

                  </div>
                  <button onClick={() => console.log("More")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>

                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
