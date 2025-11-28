import '../css/Home.css'
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import UploadAudio from '../components/UploadAudio'
import { useUser } from "../contexts/UserContext";

// import { getAudios } from '../services/api'
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
      <Header></Header>
      <main className="container-main">
        {!isLoggedIn && (
          <LoginMessage></LoginMessage>
        )}

        {isLoggedIn && (
          <>
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
                  <div className="audios-scroll-container" style={{ display: 'flex', gap: '10px' }}>
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
                    <p>No audios found.</p>
                  ) : (
                    <div className="audios-scroll-container">
                      {audios.map(audio => (
                        <AudioBox
                          key={audio.id}
                          audio={audio}
                          width={"140px"}
                          height={"140px"}
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
