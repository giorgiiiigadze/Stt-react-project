import Header from "../components/Header";
import "../css/Audios.css";
import { useUser } from "../contexts/UserContext";
import { useRef, useState, useEffect } from "react";
import { getAudios } from "../services/api";

import AudioSatus from "../components/AudioStatus";
import AudioGenre from "../components/AudioGenre";
import AudioSelect from "../components/AudioSelect";
import AudioTable from "../components/Table/AudioTables";

import LoginMessage from "../components/LoginMessage";

import Tooltip from "@mui/material/Tooltip";

export default function Audios() {
  const { user, userLoading } = useUser();

  const [audios, setAudios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useRef(false);

  useEffect(() => {
    isLoggedIn.current = !!localStorage.getItem("access_token");

  }, []);

  useEffect(() => {
    if (!isLoggedIn.current) {
      setAudios([]);
      setError(null);
      setLoading(false);
      return;
    }

    const loadAudios = async () => {
      try {
        const audiosData = await getAudios();
        setAudios(audiosData);
      } catch (err) {
        if (err.status === 403) {
          setError("Not authorized");
        } else {
          setError("Failed to load audios...");
        }
      } finally {
        setLoading(false);
      }
    };

    loadAudios();
  }, []);



  return (
    <div className="container">
      <Header />

      <main className="details-container">
        <h1>Audio Tracker</h1>

        {!isLoggedIn.current && <LoginMessage></LoginMessage>}
        {loading && <p>Loading audios...</p>}
        {isLoggedIn.current && error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && isLoggedIn.current && (
            <>
              <section className="filtation-section">
                <span>{userLoading ? "Loading..." : user?.username}</span>
              </section>
                <AudioTable data={audios}></AudioTable>

            </>
        )}
      </main>
    </div>
  );
}
