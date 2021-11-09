import React, { useState, useEffect } from 'react';
import './App.css';

import { Graph, Player } from "./components";

function App() {
  const [currentPlayback, setCurrentPlayback ] = useState(null);

  return (
    <div className="App">
      <Player currentPlayback={currentPlayback} setCurrentPlayback={setCurrentPlayback}/>
      <Graph currentPlayback={currentPlayback} setCurrentPlayback={setCurrentPlayback}/>
    </div>
  );
}

export default App;
