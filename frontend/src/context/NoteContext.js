import axios from "axios";
import { createContext, useMemo, useState } from "react";

export const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [allNotes, setAllNotes] = useState({ map: new Map() });
  const [choosenNoteId, setChoosenNoteId] = useState(null);

  const getAllNotesAndChooseFirstIfHas = async () => {
    let res = await axios.get("/api/notes");
    if (res.data.length) {
      const mapAllNotes = new Map();
      res.data.forEach(_note => {
        mapAllNotes.set(_note._id, _note);
      })
      setAllNotes({ map: mapAllNotes })
      if (res.data.length > 0) {
        setChoosenNoteId(res.data[0]._id);
      }
    }
  }

  const getAllNotes = async () => {
    let res = await axios.get("/api/notes");
    if (res.data.length) {
      const mapAllNotes = new Map();
      res.data.forEach(_note => {
        mapAllNotes.set(_note._id, _note);
      })
      setAllNotes({ map: mapAllNotes })
    }
  }
  const updateNoteInState = (id, note) => {
    allNotes.map.set(id, note);
    setAllNotes({ map: allNotes.map })
  }
  const createNewNote = async ({ title, body }) => {
    let res = await axios.post("/api/notes", { title, body });
    return res.data;
  }
  const deleteNote = async (id) => {
    await axios.delete(`/api/notes/${id}`);
  }
  const updateNote = async ({ _id, title, body }) => {
    const updatedNote = await axios.put("/api/notes", { _id, title, body });
    return updatedNote.data;
  }
  const noteContextValue = useMemo(() => ({
    allNotes,
    updateNoteInState,
    getAllNotes,
    createNewNote,
    deleteNote,
    updateNote,
    choosenNoteId,
    setChoosenNoteId,
    getAllNotesAndChooseFirstIfHas
  }), [allNotes, choosenNoteId])

  return (
    <NoteContext.Provider value={noteContextValue}>
      {children}
    </NoteContext.Provider>
  );
}
