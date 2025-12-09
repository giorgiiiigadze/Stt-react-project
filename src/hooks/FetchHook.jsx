import { useEffect, useState } from "react";
import { getAudios } from "../services/api";
import { useUser } from "../contexts/UserContext";

export default function useFetchAudios(userParam) {
  const [audios, setAudios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const context = useUser();
  const effectiveUser = userParam ?? context?.user;

  const isLoggedIn = !!localStorage.getItem("access_token");

  useEffect(() => {
    let mounted = true;

    if (!isLoggedIn) {
      setAudios([]);
      setLoading(false);
      setError("You must be logged in");
      return () => { mounted = false; };
    }

    const loadAudios = async () => {
      try {
        // Artificial delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const audiosData = await getAudios();
        if (!mounted) return;
        setAudios(audiosData);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        else if (err?.status === 429) {
          setError("Way too many requests were sent");
        }
        else {
          setError("Failed to load audios...");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    setLoading(true);
    loadAudios();

    return () => {
      mounted = false;
    };
  }, [isLoggedIn, effectiveUser]);

  return {
    audios,
    loading,
    error,
    isLoggedIn,
  };
}
