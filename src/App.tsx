import React from 'react';
import './App.css';
import TwordleGrid from "./components/TwordleGrid/TwordleGrid";
import TwordleTile from "./components/TwordleTile/TwordleTile";
import GenerateGameTileProps from "./utils/GenerateGameTileProps";
import GenerateGame from "./utils/GenerateGame";
import Games from "./data/games.json";

function App() {
  const words = Games[0];
  const gameGrid = GenerateGame(words[0], words[1]);

  return (
    <div className="App">
      <h1>Twordle</h1>
      <TwordleGrid>
        {GenerateGameTileProps(gameGrid).map((tile) => {
          return (
            <TwordleTile disabled={tile.disabled}/>
          )
        })}
      </TwordleGrid>
    </div>
  );
}

export default App;
