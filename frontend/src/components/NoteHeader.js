import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

function NoteHeader() {
  const { deleteNote, choosenNoteId, createNewNote, getAllNotes, setChoosenNoteId } = useContext(NoteContext);
  const onCreateNote = async () => {
    const { _id: noteId } = await createNewNote({ title: "", body: "" })
    await getAllNotes();
    setChoosenNoteId(noteId);
  }
  const onDeleteNote = async () => {
    await deleteNote(choosenNoteId);
    await getAllNotes();
  }

  return <>
    <button type="button" className="mr-5">List</button>
    <button type="button" className="mr-5">Square</button>
    <button type="button" className="mr-5" onClick={onDeleteNote}>Delete</button>
    <button type="button" className="mr-5" onClick={onCreateNote}>New Notes</button>
    Sync
  </>;
}

export default NoteHeader;