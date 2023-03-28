import React, { useState } from 'react';
import './App.css';
import TwordleGame from "./components/TwordleGame/TwordleGame";
import AppContext, { IAppContext } from "./components/AppContext";

function App() {
  const [ currentGuessGrid, setCurrentGuessGrid ] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ])
  const appContext: IAppContext = {
    currentGuessGrid: currentGuessGrid,
    setCurrentGuessGrid: setCurrentGuessGrid
  };

  return (
    <AppContext.Provider value={appContext}>
      <div className={"App"}>
        <h1>Twordle</h1>
        <TwordleGame/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
