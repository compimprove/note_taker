import './App.css';
import React from 'react';
import NoteScreen from './screen/NoteScreen';
import { NoteProvider } from './context/NoteContext';

function App() {
  return (
    <div className="App">
      <NoteProvider>
        <NoteScreen />
      </NoteProvider>
    </div>
  );
}

export default App;
