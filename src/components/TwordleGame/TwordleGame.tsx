import Games from "../../data/games.json";
import GenerateGame from "../../utils/GenerateGame";
import TwordleGrid from "../TwordleGrid/TwordleGrid";
import GenerateGameTileProps from "../../utils/GenerateGameTileProps";
import TwordleTile from "../TwordleTile/TwordleTile";
import React from "react";

function TwordleGame() {
  const gameNumber = Math.abs(new Date().getDate() - new Date(process.env.REACT_APP_INITIAL_DATE!).getDate()) + 1;

  const words = Games[gameNumber];
  const gameGrid = GenerateGame(words[0], words[1]);

  return (
    <div>
      <h2>Game {gameNumber}</h2>
      <TwordleGrid>
        {GenerateGameTileProps(gameGrid).map((tile, index) => {
          return (
            <TwordleTile key={index} disabled={tile.disabled}/>
          )
        })}
      </TwordleGrid>
    </div>
  );
}

export default TwordleGame;
