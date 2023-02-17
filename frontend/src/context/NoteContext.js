import axios from "axios";
import { createContext, useMemo, useState } from "react";

export const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [allNotes, setAllNotes] = useState([]);
  const getAllNotes = async () => {
    let res = await axios.get("/api/notes");
    setAllNotes(res.data)
  }
  const createNewNote = async ({ title, body }) => {
    await axios.post("/api/notes", { title, body });
  }
  const deleteNote = async ({ _id }) => {
    await axios.delete("/api/notes", { _id });
  }
  const updateNote = async ({ _id, title, body }) => {
    await axios.put("/api/notes", { _id, title, body });
  }
  const noteContextValue = useMemo(() => ({ allNotes, getAllNotes, createNewNote, deleteNote, updateNote }), [allNotes])

  return (
    <NoteContext.Provider value={noteContextValue}>
      {children}
    </NoteContext.Provider>
  );
}
