import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

function NoteSideBar() {
  const { allNotes, setChoosenNoteId, choosenNoteId } = useContext(NoteContext);
  const allNoteElements = [];
  allNotes.map.forEach(function (note) {
    let className = "h-24 cursor-pointer border text-left m-5 px-4 py-2 rounded-lg ";
    if (choosenNoteId === note._id) className += "bg-amber-200 "
    const createdAt = new Date(note.createdAt)
    const createdAtString = `${createdAt.getHours()}:${createdAt.getMinutes()}`
    const displayTitle = note.title ? note.title : "Empty";
    const displayBody = note.body.substr(0, 20) + (note.body.length > 20 ? "..." : "")
    allNoteElements.push(<div key={note._id} className={className} onClick={() => setChoosenNoteId(note._id)}>
      <span className="text-lg font-bold">{displayTitle}</span>
      <div className="mt-0.5">
        <span className="w-12 inline-block">{createdAtString}</span>
        <span className="inline-block text-gray-500">{displayBody}</span>
      </div>
    </div>);
  })
  return <>
    {allNoteElements}
  </>;
}

export default NoteSideBar;