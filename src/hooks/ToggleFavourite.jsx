import { useState, useEffect } from "react";
import { toggleFavoriteAudio } from "../services/api";

export const useFavoriteAudio = (initialFavorite, audioId) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const toggleFavorite = async () => {
    if (!audioId) return;

    setLoading(true);
    setError(null);

    try {
      const result = await toggleFavoriteAudio(audioId);
      setIsFavorite(result.favorite);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { isFavorite, loading, error, toggleFavorite };
};
