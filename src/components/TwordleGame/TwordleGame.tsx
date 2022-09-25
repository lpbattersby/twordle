import Games from "../../data/games.json";
import GenerateGame from "../../utils/GenerateGame";
import TwordleGrid from "../TwordleGrid/TwordleGrid";
import GenerateGameTileProps from "../../utils/GenerateGameTileProps";
import TwordleTile from "../TwordleTile/TwordleTile";
import React from "react";

function TwordleGame() {
  const words = Games[0];
  const gameGrid = GenerateGame(words[0], words[1]);

  return (
    <div>
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
