import React, { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import { DisplayType } from '../enum';
import { listVector, plusVector, squareVector, trashVector } from '../vector';
import PropTypes from 'prop-types';

function NoteHeader({ display, setDisplay }) {
  const { deleteNote,
    choosenNoteId,
    createNewNote,
    getAllNotes,
    setChoosenNoteId,
    getAllNotesAndChooseFirstIfHas,
  } = useContext(NoteContext);
  const onCreateNote = async () => {
    const { _id: noteId } = await createNewNote({ title: '', body: '' });
    await getAllNotes();
    setChoosenNoteId(noteId);
  };
  const onDeleteNote = async () => {
    await deleteNote(choosenNoteId);
    await getAllNotesAndChooseFirstIfHas();
  };

  return <div className="flex flex-row mt-4 ml-8">
    <button
      onClick={setDisplay.bind(null, DisplayType.List)}
      type="button"
      className={`transition-colors duration-150 mr-5 hover:bg-gray-200 
      p-2 rounded ${display === DisplayType.List ? 'bg-gray-200' : ''}`}>
      {listVector}
    </button>
    <button
      onClick={setDisplay.bind(null, DisplayType.Square)}
      type="button"
      className={`transition-colors duration-150 mr-5 hover:bg-gray-200 p-2 
    rounded ${display === DisplayType.Square ? 'bg-gray-200' : ''}`}>
      {squareVector}
    </button>
    <button
      type="button"
      className={`transition-colors duration-150 mr-5 
    hover:bg-gray-200 p-2 rounded`}
      onClick={onDeleteNote}>{trashVector}</button>
    <button type="button" className={`transition-colors duration-150 
    ml-48 mr-5 hover:bg-gray-200 p-2 rounded`} onClick={onCreateNote}>
      {plusVector}
    </button>
  </div>;
}

NoteHeader.propTypes = {
  display: PropTypes.number.isRequired,
  setDisplay: PropTypes.func.isRequired,
};

export default NoteHeader;
