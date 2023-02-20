import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

function NoteSideBar() {
  const { allNotes, setChoosenNoteId, choosenNoteId } = useContext(NoteContext);
  const allNoteElements = [];
  allNotes.map.forEach(function (note) {
    const isChoosenNote = choosenNoteId === note._id;
    let className = "transition-colors duration-150 h-24 cursor-pointer border text-left mx-7 my-5 px-4 py-4 rounded-lg ";
    const dateFormater = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric"
    })
    if (isChoosenNote) className += "bg-amber-200 "
    const createdAt = new Date(note.createdAt)
    const displayTitle = note.title ? note.title : "New Note";
    let displayBody = "No additional content";
    if (note.body.length > 0) displayBody = note.body.substr(0, 20) + (note.body.length > 20 ? "..." : "")
    allNoteElements.push(<div key={note._id} className={className} onClick={() => setChoosenNoteId(note._id)}>
      <span className="text-base font-bold">{displayTitle}</span>
      <div className="mt-0.5">
        <span className="w-20 inline-block">{dateFormater.format(createdAt)}</span>
        <span className={`inline-block ${isChoosenNote ? "" : "text-gray-500"}`}>{displayBody}</span>
      </div>
    </div>);
  })
  return <>
    {allNoteElements}
  </>;
}

export default NoteSideBar;