import { useRef, useState, useEffect } from "react";
import "../css/Audios.css";
import Header from "../components/Header";
import { useUser } from "../contexts/UserContext";

import useFetchAudios from "../hooks/FetchHook";

import LoginMessage from "../components/LoginMessage";
import ErrorContainer from "../components/ErrorContainer";

import Tooltip from "@mui/material/Tooltip";

export default function Audios() {
  const { user, userLoading } = useUser();

  const { error, isLoggedIn } = useFetchAudios();
  

  return (
    <>
      <Header />
      <div className="container">
    
        <main className="details-container">    
          {!isLoggedIn && <LoginMessage />}

          {isLoggedIn && error && ErrorContainer(error)}

          {isLoggedIn && (
            <>
            Hello
            </>
          )}
        </main>
      </div>
    </>
  );
}
