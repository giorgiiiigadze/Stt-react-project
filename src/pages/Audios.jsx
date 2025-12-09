import { useRef, useState, useEffect } from "react";
import "../css/Audios.css";
import Header from "../components/Header";
import { useUser } from "../contexts/UserContext";

import useFetchAudios from "../hooks/FetchHook";

import AudioTable from "../components/Table/AudioTables";

import LoginMessage from "../components/LoginMessage";

import Tooltip from "@mui/material/Tooltip";

export default function Audios() {
  const { user, userLoading } = useUser();

  const { error, isLoggedIn } = useFetchAudios();
  

  return (
    <>
      <Header />
      <div className="container">
    
        <main className="details-container">
          <h1>Audio Tracker</h1>
    
          {!isLoggedIn && <LoginMessage />}

          {isLoggedIn && error && <p style={{ color: 'red' }}>{error}</p>}

          {isLoggedIn && (
            <>
              <section className="filtation-section">
                <span>{userLoading ? "Loading..." : user?.username}</span>
              </section>
              <AudioTable />
            </>
          )}
        </main>
      </div>
    </>
  );
}
