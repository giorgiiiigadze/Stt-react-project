import { createContext, useContext, useEffect, useState } from "react";
import { getAudios, getAllTranscriptedAudios } from "../services/api";
import { delay } from "../helper/Delay";
import { useUser } from "./UserContext";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const { user, userLoading } = useUser();

  const [audios, setAudios] = useState([]);
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isLoggedIn = !!user;

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      if (userLoading) return;

      if (!isLoggedIn) {
        setAudios([]);
        setTranscriptions([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        await delay(500);

        const audiosData = await getAudios();
        if (!mounted) return;

        setAudios(audiosData);
      } catch (err) {
        if (!mounted) return;

        setError(
          err?.status === 429
            ? "Way too many requests were sent"
            : "Something went wrong while loading audios"
        );

        setLoading(false);
        return;
      }

      try {
        const transcriptionData = await getAllTranscriptedAudios();
        if (!mounted) return;

        if (!Array.isArray(transcriptionData) || transcriptionData.length === 0) {
          setTranscriptions([]);
          return;
        }

        setTranscriptions(transcriptionData);
      } catch {
        if (!mounted) return;
        setTranscriptions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [isLoggedIn, userLoading]);


  function removeAudio(audioId) {
    setAudios(prev => prev.filter(audio => audio.id !== audioId));
    setTranscriptions(prev =>
      prev.filter(t => t.audio_id !== audioId)
    );
  }

  function updateAudio(updatedAudio) {
    setAudios(prev =>
      prev.map(audio =>
        audio.id === updatedAudio.id ? updatedAudio : audio
      )
    );
  }

  function addAudio(newAudio) {
    setAudios(prev => [newAudio, ...prev]);
  }

  return (
    <AudioContext.Provider
      value={{
        audios,
        transcriptions,
        loading,
        error,
        isLoggedIn,
        removeAudio,
        updateAudio,
        addAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudios() {
  return useContext(AudioContext);
}
