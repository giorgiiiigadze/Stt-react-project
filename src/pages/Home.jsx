import '../css/Home.css'
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import { useUser } from "../contexts/UserContext";

import AudioBox from '../components/AudioBox';

import Tooltip from '@mui/material/Tooltip';
import LoginMessage from '../components/LoginMessage';

import useFetchAudios from '../hooks/FetchHook';

// Skeleton loading library
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function Home() {
  const { user, userLoading } = useUser();
  const { audios, loading, error, isLoggedIn } = useFetchAudios();

  return (
    <div className="container">
      <Header />

      <main className="container-main">
        {!isLoggedIn && <LoginMessage />}

        {isLoggedIn && (
          <>
            {/* Skeleton Loading */}
            {loading && (
              <>
                <div className='upper-text-container'>
                  <Skeleton 
                    width={200} 
                    height={16}
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

            {/* Error */}
            {!loading && error && <p>{error}</p>}

            {/* Content */}
            {!loading && !error && (
              <>
                <div className='upper-text-container'>
                  <span>{userLoading ? "Loading..." : user?.username}s workshop</span>
                </div>

                {/* ALL AUDIOS */}
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
                  )}
                </div>

                {/* FAVORITE AUDIOS */}
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
