import React, { useState } from 'react';
import './App.css';
import Game from "./components/Game/Game";
import AppContext, { IAppContext } from "./components/AppContext";

function App() {
  const [ currentGuessGrid, setCurrentGuessGrid ] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ])
  const appContext: IAppContext = {
    currentGrid: currentGuessGrid,
    setCurrentGrid: setCurrentGuessGrid
  };

  return (
    <AppContext.Provider value={appContext}>
      <div className={"App"}>
        <h1>Twordle</h1>
        <Game/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
