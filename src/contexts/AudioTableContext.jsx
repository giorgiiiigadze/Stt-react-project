import { createContext, useContext } from "react";
import useFetchAudios from "../hooks/FetchHook";

import AudioStatus from "../components/AudioStatus";
import AudioGenre from '../components/AudioGenre'

const TableContext = createContext({
  columns: [],
  rows: [],
  loading: false,
  error: null,
});

export function useTable() {
  return useContext(TableContext);
}

export function TableProvider({ children }) {
  const { audios, loading, error } = useFetchAudios();

  const columns = [
    { id: "file_title", label: "Title", width: 460 },
    { id: "status", label: "Status", width: 150 },
    { id: "created_at", label: "Created", width: 250 },
    { id: "audio_ganre", label: "Genre", width: 200 },

    { id: "transcripted", label: "Transcripted", width: 250 },
    { id: "favorite", label: "Favorite", width: 200 },
    { id: "add_column", label: "+", width: 100 },

  ];

  const rows =
    audios?.map((audio) => ({
      id: audio.id,
      file_title: audio.file_title || "Untitled",
      audio_ganre: <AudioGenre genre={audio.audio_ganre} padding={10}/>,
      status: <AudioStatus status={audio.status} padding={8}/>,
      created_at: new Date(audio.created_at).toLocaleDateString(),
      transcripted: audio.transcripted ? "Yes" : "No",
      favorite: audio.favorite ? "★" : "—",
    })) || [];

  const value = { columns, rows, loading, error };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}

export default TableContext;
