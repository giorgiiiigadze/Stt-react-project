import { useEffect, useState } from "react";
import { getAudios } from "../services/api";

export default function useFetchAudios() {
  const [audios, setAudios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isLoggedIn] = useState(() => !!localStorage.getItem("access_token"));

  useEffect(() => {
    let mounted = true;

    if (!isLoggedIn) {
      setLoading(false);
      return () => { mounted = false; };
    }

    const loadAudios = async () => {
      try {
        // Artificial delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const audiosData = await getAudios();
        if (!mounted) return;
        setAudios(audiosData);
      } catch (err) {
        if (!mounted) return;
        if (err?.status === 403) {
          setError("Not authorized");
        } else if (err?.status === 429) {
          setError("Way too many requests were sent");
        } else {
          setError("Failed to load audios...");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadAudios();

    return () => {
      mounted = false;
    };
  }, [isLoggedIn]);

  return {
    audios,
    loading,
    error,
    isLoggedIn,
  };
}
