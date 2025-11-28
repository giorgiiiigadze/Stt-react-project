import { useEffect, useState, useRef } from "react";
import { getAudios } from "../services/api";

export default function useFetchAudios() {
  const [audios, setAudios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useRef(false);

  useEffect(() => {
    isLoggedIn.current = !!localStorage.getItem("access_token");
  }, []);

  useEffect(() => {
    if (!isLoggedIn.current) {
      setLoading(false);
      return;
    }

    const loadAudios = async () => {
      try {
        // Artificial delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const audiosData = await getAudios();
        setAudios(audiosData);
      } catch (err) {
        if (err.status === 403) {
          setError("Not authorized");
        } else if (err.status === 429) {
          setError("Way too many requests were sent");
        } else {
          setError("Failed to load audios...");
        }
      } finally {
        setLoading(false);
      }
    };

    loadAudios();
  }, []);

  return {
    audios,
    loading,
    error,
    isLoggedIn: isLoggedIn.current,
  };
}
