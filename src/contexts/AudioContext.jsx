import { createContext, useContext, useEffect, useState } from "react";
import { getAudios, getAllTranscriptedAudios } from "../services/api";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [audios, setAudios] = useState([]);
  const [transcriptions, setTranscriptions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = !!localStorage.getItem("access_token");

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      if (!isLoggedIn) {
        setAudios([]);
        setTranscriptions([]);
        setLoading(false);
        setError("You must be logged in");
        return;
      }

      setLoading(true);

      try {
        const audiosData = await getAudios()
        if (!mounted) return

        const transcriptionData = await getAllTranscriptedAudios()
        if (!mounted) return

        setAudios(audiosData)
        setTranscriptions(transcriptionData)

        setError(null)
      } catch (err) {
        if (!mounted) return;
        setError("Failed to load audios or transcriptions...")
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [isLoggedIn])

  return (
    <AudioContext.Provider value={{ audios, transcriptions, loading, error, isLoggedIn }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudios() {
  return useContext(AudioContext)
}
