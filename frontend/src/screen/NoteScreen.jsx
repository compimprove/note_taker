import React, { useContext, useEffect, useState } from 'react';
import NoteEditor from '../components/NoteEditor';
import NoteHeader from '../components/NoteHeader';
import NoteSideBar from '../components/NoteSideBar';
import NoteSquare from '../components/NoteSquare';
import { NoteContext } from '../context/NoteContext';
import { DisplayType } from '../enum';

function NoteScreen() {
  const { getAllNotesAndChooseFirstIfHas, allNotes } = useContext(NoteContext);
  const [display, setDisplay] = useState(DisplayType.List);

  useEffect(() => {
    getAllNotesAndChooseFirstIfHas();
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="bg-gray-100 border-slate-200 border-b basis-14">
        <NoteHeader display={display} setDisplay={setDisplay} />
      </header>
      <div className="flex flex-row basis grow">
        {display === DisplayType.List && (
          <>
            <div className="basis-96 border-slate-200 border-r">
              {allNotes.map.size > 0 && <NoteSideBar />}
              {allNotes.map.size === 0 && (
                <div className="mt-32">
                  <span className="text-gray-400 text-2xl">No Notes</span>
                </div>
              )}
            </div>
            <div className="basis grow">
              {allNotes.map.size > 0 && <NoteEditor />}
            </div>
          </>
        )}
        {display === DisplayType.Square && (
          <>
            {allNotes.map.size === 0 && (
              <div className="mt-32">
                <span className="text-gray-400 text-2xl">No Notes</span>
              </div>
            )}
            {allNotes.map.size > 0 && <NoteSquare />}
          </>
        )}
      </div>
    </div>
  );
}

export default NoteScreen;
