import '../css/Home.css'
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import AudioBox from '../components/AudioBox';
import LoginMessage from '../components/LoginMessage';

import { useUser } from "../contexts/UserContext";
import { useAudios } from '../contexts/AudioContext';

import Tooltip from '@mui/material/Tooltip';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function Home() {
  const { user, userLoading } = useUser();
  const { audios, loading, error, isLoggedIn } = useAudios();

  return (
    <div className="container">
      <Header />

      <main className="container-main">
        {!isLoggedIn && <LoginMessage />}

        {isLoggedIn && (
          <>
            {loading && (
              <>
                <div className='upper-text-container'>
                  <Skeleton 
                    width={200} 
                    height={10}
                    style={{ borderRadius: '22px' }}
                    baseColor="#292929"
                    highlightColor="#515151ff"
                  />
                </div>

                <div className="audios-container">
                  <div className="audios-scroll-container">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton
                        key={i}
                        width={140}
                        height={140}
                        style={{ borderRadius: '22px'}}
                        baseColor="#252525"
                        highlightColor="#353535ff"
                      />
                    ))}
                  </div>
                </div>

                <div className="audios-container liked-audios-container">
                  <div className="audios-scroll-container">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton
                        key={i}
                        width={240}
                        height={180}
                        style={{ borderRadius: '16px'}}
                        baseColor="#252525"
                        highlightColor="#353535ff"
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {!loading && error && <p>{error}</p>}

            {!loading && !error && (
              <>
                <div className='upper-text-container'>
                  <span>{userLoading ? "Loading..." : user?.username}s workshop</span>
                </div>

                <div className="audios-container">
                  {audios.length === 0 ? (
                    <div
                      style={{
                        border: "1px solid #333",
                        borderRadius: "16px",
                        padding: "20px",
                        margin: "10px",
                        textAlign: "center",
                        background: "#1b1b1b"
                      }}
                    >
                      <div style={{ fontSize: "32px", marginBottom: "10px" }}>🎧</div>
                      <h3 style={{ color: "#e0e0e0", margin: 0 }}>No audios yet</h3>
                      <p style={{ color: "#a6a6a6", marginTop: "6px", fontSize: "14px" }}>
                        Upload or record your first audio to get started.
                      </p>
                    </div>
                  ) : (
                    <div style={{maxWidth: '100%'}}>
                      <p style={{ 
                        fontSize: '12px', 
                        fontWeight: 500, 
                        color: '#ada9a3',
                        display: 'flex',
                        alignItems: 'center'
                        }}><svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#ada9a3"><path d="M430-200q38 0 64-26t26-64v-150h120v-80H480v155q-11-8-23.5-11.5T430-380q-38 0-64 26t-26 64q0 38 26 64t64 26ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg><span>Your audios</span></p>
                      <div className="audios-scroll-container">
                        {audios.map(audio => (
                          <AudioBox
                            key={audio.id}
                            audio={audio}
                            width={"140px"}
                            height={"140px"}
                            borderRadius={22}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="audios-container liked-audios-container">
                  {audios.filter(audio => audio.favorite).length === 0 ? (
                    <Tooltip title="Favourite audios you like.." placement="right">
                      <div
                        style={{
                          border: "1px solid #333",
                          borderRadius: "16px",
                          padding: "20px",
                          margin: "10px",
                          textAlign: "center",
                          background: "#1b1b1b"
                        }}
                      >
                        <div style={{ fontSize: "26px", marginBottom: "10px" }}>⭐</div>
                        <h4 style={{ color: "#e0e0e0", margin: 0 }}>No favourite audios yet</h4>
                        <p style={{ color: "#a6a6a6", marginTop: "6px", fontSize: "13px" }}>
                          Favourite an audio to pin it here.
                        </p>
                      </div>
                    </Tooltip>
                  ) : (
                    <div style={{maxWidth: '100%'}}>
                      <Tooltip title="Favourite audios you like.." placement="right">
                        <p style={{ 
                          fontSize: '12px', 
                          fontWeight: 500, 
                          color: '#ada9a3',
                          display: 'flex',
                          alignItems: 'center'
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#ada9a3">
                              <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
                            </svg>
                            <span>Your Favourited audios</span>
                        </p>
                      </Tooltip>
                      <div className="audios-scroll-container">
                        {audios
                          .filter(audio => audio.favorite)
                          .map(audio => (
                            <AudioBox
                              key={audio.id}
                              borderRadius={16}
                              audio={audio}
                              width={"240px"}
                              height={"180px"}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
