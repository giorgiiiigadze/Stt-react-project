import { useState } from "react";
import { toggleFavoriteAudio } from "../services/api";

export const useFavoriteAudio = (initialFavorite, audioId) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleFavorite = async (favorite = null) => {
    setLoading(true);
    setError(null);
    try {
      const result = await toggleFavoriteAudio(audioId, favorite);
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