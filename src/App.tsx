import React from 'react';
import './App.css';
import TwordleGrid from "./components/TwordleGrid/TwordleGrid";
import TwordleTile from "./components/TwordleTile/TwordleTile";
import GenerateDefaultTileProps from "./utils/GenerateDefaultTileProps";

function App() {


  return (
    <div className="App">
      <h1>Twordle</h1>
      <TwordleGrid>
        {GenerateDefaultTileProps().map((tile) => {
          return (
            <TwordleTile disabled={tile.disabled}/>
          )
        })}
      </TwordleGrid>
    </div>
  );
}

export default App;
