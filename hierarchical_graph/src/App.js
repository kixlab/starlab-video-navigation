import React, { useState, useEffect } from 'react';
import './App.css';

import { Graph, Player } from "./components";

function App() {
  const [seekTime, setSeekTime] = useState(0);

  return (
    <div className="App">
      <Player seekTime={seekTime}/>
      <Graph setSeekTime={setSeekTime}/>
    </div>
  );
}

export default App;
