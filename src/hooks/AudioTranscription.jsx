import { useState } from "react";
import { transcribeAudio } from "../services/api";

export function useTranscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function startTranscription(audioId) {
    try {
      setLoading(true);
      setError(null);

      const data = await transcribeAudio(audioId);
      setResult(data);

      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { startTranscription, loading, error, result };
}
