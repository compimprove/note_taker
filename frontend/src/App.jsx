import "./App.css";
import React from "react";
import axios from "axios";
import NoteScreen from "./screen/NoteScreen";
import { NoteProvider } from "./context/NoteContext";

function App() {
  const getData = async () => {
    let res = await axios("/api/notes");
    console.log(res.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <NoteProvider>
        <NoteScreen />
      </NoteProvider>
    </div>
  );
}

export default App;
