import React from 'react';
import './App.css';
import TwordleGame from "./components/TwordleGame/TwordleGame";
import AppContext, { IAppContext } from "./components/AppContext";

function App() {
  const appContext: IAppContext = {};

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
