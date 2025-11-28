import React, { createContext, useContext } from "react";
import useFetchAudios from "../hooks/FetchHook";

import AudioStatus from "../components/AudioStatus";
import AudioGenre from '../components/AudioGenre'

const TableContext = createContext({
  columns: [],
  rows: [],
});

export function useTable() {
  return useContext(TableContext);
}

export function TableProvider({ children }) {
  const { audios } = useFetchAudios();

  const columns = [
    { id: "file_title", label: "Title", width: 360 },
    { id: "status", label: "Status", width: 100 },
    { id: "created_at", label: "Created", width: 150 },
    { id: "audio_ganre", label: "Genre", width: 120 },

    { id: "transcripted", label: "Transcripted", width: 140 },
    { id: "favorite", label: "Favorite", width: 120 },
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

  const value = { columns, rows };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}

export default TableContext;
