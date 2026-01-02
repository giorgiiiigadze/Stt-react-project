import { transcribeAudio } from "../services/api";

export function useTranscription() {
  async function startTranscription(audioId) {
    return transcribeAudio(audioId);
  }

  return { startTranscription };
}
