import Games from "../../data/games.json";
import GenerateGame from "../../utils/GenerateGame";
import TwordleGrid from "../TwordleGrid/TwordleGrid";
import GenerateGameTileProps from "../../utils/GenerateGameTileProps";
import TwordleTile from "../TwordleTile/TwordleTile";
import React, { useContext, useState } from "react";
import AppContext from "../AppContext";

function TwordleGame() {
  const { currentGuessGrid } = useContext(AppContext)!;
  const gameNumber = Math.abs(new Date().getDate() - new Date(process.env.REACT_APP_INITIAL_DATE!).getDate()) + 1;
  const words = Games[gameNumber];
  const gameGrid = GenerateGame(words[0], words[1]);

  console.log(words);

  const [ tileProps, setTileProps ] = useState(GenerateGameTileProps(gameGrid))

  const handleSubmit = () => {
    const newTileProps = tileProps.map((row) => row.map((tile) => ({...tile})));

    for (const row of newTileProps){
      for (const tile of row){
        const lettersMatch = gameGrid[tile.coordinates[0]][tile.coordinates[1]] === currentGuessGrid[tile.coordinates[0]][tile.coordinates[1]]
        if(lettersMatch) {
          tile.tileType = "correct-place";
        }
      }
    }

    console.log(newTileProps);
    setTileProps(newTileProps);
  };

  return (
    <div>
      <h2>Game {gameNumber}</h2>
      <TwordleGrid>
        {tileProps.map((row, index1) => {
            return (
              row.map((tileProps, index2) => {
                return (
                  <TwordleTile
                    key={`${index1},${index2}`}
                    {...tileProps}
                  />
                )
              })
            )
        }
          )}
      </TwordleGrid>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default TwordleGame;
