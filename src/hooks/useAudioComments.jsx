import { useEffect, useRef, useState } from "react";
import { getAudioComments, commentAudio } from "../services/api";

import { delay } from "../helper/Delay";

export function useAudioComments(audioId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchedRef = useRef(false);
  const requestIdRef = useRef(0);

  async function fetchComments(force = false) {
    if (fetchedRef.current && !force) return;

    const requestId = ++requestIdRef.current;

    try {
      setLoading(true);
      setError(null);
      
      // await delay(500);
      
      const data = await getAudioComments(audioId);

      if (requestId !== requestIdRef.current) return;

      setComments(data);
      fetchedRef.current = true;
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setError(err);
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }

  async function addComment(content) {
    const tempId = `temp-${Date.now()}`;

    const tempComment = {
      id: tempId,
      content,
      created_at: new Date().toISOString(),
      optimistic: true,
    };

    setComments(prev => [tempComment, ...prev]);

    try {
      const savedComment = await commentAudio(audioId, content);

      setComments(prev =>
        prev.map(c => (c.id === tempId ? savedComment : c))
      );

      return savedComment;
    } catch (err) {
      setComments(prev => prev.filter(c => c.id !== tempId));
      throw err;
    }
  }

  function removeComment(commentId) {
    setComments(prev => prev.filter(c => c.id !== commentId));
  }

  useEffect(() => {
    if (!audioId) return;

    fetchedRef.current = false;
    requestIdRef.current++;
    fetchComments(true);
  }, [audioId]);

  return {
    comments,
    addComment,
    removeComment,
    loading,
    error,
    refetch: () => fetchComments(true),
  };
}
