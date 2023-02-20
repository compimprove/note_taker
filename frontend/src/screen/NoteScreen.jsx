import { useContext, useEffect } from "react";
import NoteEditor from "../components/NoteEditor";
import NoteHeader from "../components/NoteHeader";
import NoteSideBar from "../components/NoteSideBar";
import { NoteContext } from "../context/NoteContext";

function NoteScreen() {
  const { getAllNotesAndChooseFirstIfHas } = useContext(NoteContext);

  useEffect(() => {
    getAllNotesAndChooseFirstIfHas();
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="bg-gray-100 border-slate-200 border-b basis-14">
        <NoteHeader />
      </header>
      <div className="flex flex-row basis grow">
        <div className="basis-96 border-slate-200 border-r">
          <NoteSideBar />
        </div>
        <div className="basis grow">
          <NoteEditor />
        </div>
      </div>
    </div>
  );
}

export default NoteScreen;
