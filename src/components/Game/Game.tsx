import Games from "../../data/games.json";
import GenerateGame from "../../utils/GenerateGame";
import Grid from "../Grid/Grid";
import GenerateGameTileProps from "../../utils/GenerateGameTileProps";
import Tile, { TileProps } from "../Tile/Tile";
import React, { useContext, useState } from "react";
import AppContext from "../AppContext";

function Game() {
  const gameNumber = Math.abs(new Date().getDate() - new Date(process.env.REACT_APP_INITIAL_DATE!).getDate()) + 1;
  const words = Games[gameNumber];

  const { currentGrid, setCurrentGrid } = useContext(AppContext)!;
  const { solutionGrid, solutionLetterCounts } = GenerateGame(words[0], words[1]);

  // const [ pastGuesses, setPastGuesses ] = useState<string[][][]>([]);
  const [ gridPropsList, setGridPropsList ] = useState<TileProps[][][]>([GenerateGameTileProps(solutionGrid)]);

  const startNewGuess = () => {
    checkLetters();

    // const newPastGuesses = pastGuesses.map((grid) => grid.map((row) => ([...row])));
    //
    // console.log(gridPropsList);
    //
    // const newGridPropsList = gridPropsList
    //   .map((grid) => grid
    //       .map((row) => row
    //           .map((props) => {
    //             props.disabled = true;
    //             return props;
    //           })
    //       )
    //   );
    //
    // console.log(newGridPropsList);
    //
    // newPastGuesses.push(currentGuessGrid);
    // newGridPropsList.push(GenerateGameTileProps(answersGrid));
    //
    // setPastGuesses(newPastGuesses);
    // setGridPropsList(newGridPropsList);
    // setCurrentGuessGrid([
    //   ["", "", "", "", ""],
    //   ["", "", "", "", ""],
    //   ["", "", "", "", ""],
    //   ["", "", "", "", ""],
    //   ["", "", "", "", ""],
    //   ["", "", "", "", ""]
    // ]);
  }

  const checkLetters = () => {
    const newTileProps = gridPropsList[gridPropsList.length - 1].map((row) => row.map((tile) => ({...tile})));

    const yellowLetterCount : Record<string, number> = {}

    // check for correct

    for (const row of newTileProps){
      for (const tile of row){
        const guessedLetter = currentGrid[tile.coordinates[0]][tile.coordinates[1]];
        const correctLetter = solutionGrid[tile.coordinates[0]][tile.coordinates[1]];

        const isCorrect = correctLetter === guessedLetter;

        if(isCorrect) {
          let count;
          count = yellowLetterCount[guessedLetter];
          yellowLetterCount[guessedLetter] = count ? count + 1 : 1;

          tile.tileState = "correct-place";
          tile.disabled = true;
        }
      }
    }

    // check for yellow

    for (const row of newTileProps){
      for (const tile of row){
        const guessedLetter = currentGrid[tile.coordinates[0]][tile.coordinates[1]];

        const isYellow = words.some((word) => word.includes(guessedLetter));

        if(isYellow){
          let count;
          count = yellowLetterCount[guessedLetter];
          yellowLetterCount[guessedLetter] = count ? count + 1 : 1;

          if(yellowLetterCount[guessedLetter]<=solutionLetterCounts[guessedLetter]){
            tile.tileState = "wrong-place";
          }
        }
        else{
          tile.tileState = "incorrect";
        }
        tile.disabled = true;
      }
    }

    console.log(yellowLetterCount);
    console.log(solutionLetterCounts);
    console.log(words);

    let newGridPropsList = gridPropsList.map((grid) => grid.map((row) => row.map((prop) => prop)));

    setGridPropsList([...newGridPropsList.slice(0, -1), newTileProps]);
  }

  const handleSubmit = () => {
    startNewGuess();
  };

  return (
    <div>
      <h2>Game {gameNumber}</h2>
      {gridPropsList.map((tileProps, gridNumber) => {
        return (<Grid key={gridNumber}>
        {tileProps.map((row, rowNumber) => {
            return (
              row.map((tileProps, columnNumber) => {
                return (
                  <Tile
                    key={`${rowNumber},${columnNumber}`}
                    {...tileProps}
                  />
                )
              })
            )
          }
        )}
      </Grid>)})
      }
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default Game;
