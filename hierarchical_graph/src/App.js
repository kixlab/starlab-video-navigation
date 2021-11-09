import React, { useState, useEffect } from 'react';
import './App.css';

import { Graph, Player } from "./components";

function App() {

  return (
    <div className="App">
      <Player/>
      <Graph/>
    </div>
  );
}

export default App;
