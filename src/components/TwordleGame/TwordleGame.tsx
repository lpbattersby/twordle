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
  const { gameGrid, letterCounts } = GenerateGame(words[0], words[1]);
  const [ tileProps, setTileProps ] = useState(GenerateGameTileProps(gameGrid))

  const checkLetters = () => {
    const newTileProps = tileProps.map((row) => row.map((tile) => ({...tile})));

    const yellowLetterCount : Record<string, number> = {}

    // check for correct

    for (const row of newTileProps){
      for (const tile of row){
        const guessedLetter = currentGuessGrid[tile.coordinates[0]][tile.coordinates[1]];
        const correctLetter = gameGrid[tile.coordinates[0]][tile.coordinates[1]];

        const lettersMatch = correctLetter === guessedLetter;

        if(lettersMatch) {
          let count;
          count = yellowLetterCount[guessedLetter];
          yellowLetterCount[guessedLetter] = count ? count + 1 : 1;

          tile.tileType = "correct-place";
        }
      }
    }

    // check for yellow

    for (const row of newTileProps){
      for (const tile of row){
        const guessedLetter = currentGuessGrid[tile.coordinates[0]][tile.coordinates[1]];

        const isYellow = words.some((word) => word.includes(guessedLetter));

        if(isYellow){
          let count;
          count = yellowLetterCount[guessedLetter];
          yellowLetterCount[guessedLetter] = count ? count + 1 : 1;

          if(yellowLetterCount[guessedLetter]<=letterCounts[guessedLetter]){
            tile.tileType = "wrong-place";
          }
        }
        else{
          tile.tileType = "incorrect";
        }
      }
    }

    setTileProps(newTileProps);
  }

  const handleSubmit = () => {
    checkLetters();
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
