import { useContext, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";

function NoteScreen() {
  const { allNotes, getAllNotes } = useContext(NoteContext);
  useEffect(() => {
    getAllNotes();
  }, []);
  return <>{allNotes.length}</>;
}

export default NoteScreen;
