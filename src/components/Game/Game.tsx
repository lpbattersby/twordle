import Games from "../../data/games.json";
import GenerateGame from "../../utils/GenerateGame";
import dateDiffInDays from "../../utils/DateDiffInDays";
import Grid from "../Grid/Grid";
import GenerateGameTileProps from "../../utils/GenerateGameTileProps";
import Tile, { TileProps } from "../Tile/Tile";
import React, { useContext, useState } from "react";
import AppContext from "../AppContext";
import checkCurrentWords from "../../utils/CheckCurrentWords";

function Game() {
  const today = new Date();
  const startDate = new Date(process.env.REACT_APP_INITIAL_DATE!);
  const gameNumber = dateDiffInDays(today, startDate)
  const words = Games[gameNumber];

  const { currentGrid, setCurrentGrid } = useContext(AppContext)!;
  const { solutionGrid, solutionLetterCounts, gameShape } = GenerateGame(words[0], words[1]);

  const [ pastGuesses, setPastGuesses ] = useState<string[][][]>([]);
  const [ gridPropsList, setGridPropsList ] = useState<TileProps[][][]>([GenerateGameTileProps(solutionGrid)]);

  const [ msg, setMsg ] = useState("");

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
    // newPastGuesses.push(currentGrid);
    // newGridPropsList.push(GenerateGameTileProps(solutionGrid));
    //
    // setPastGuesses(newPastGuesses);
    // setGridPropsList(newGridPropsList);
    // setCurrentGrid([
    //   ["", "", "", "", ""],
    //   ["", "", "", "", ""],
    //   ["", "", "", "", ""],
    //   ["", "", "", "", ""],
    //   ["", "", "", "", ""],
    //   ["", "", "", "", ""]
    // ]);
  }

  const checkLetters = () => {
    const { wordsAreValid } = checkCurrentWords(currentGrid, gameShape);

    if(wordsAreValid) {
      setMsg("");
      const newTileProps = gridPropsList[gridPropsList.length - 1].map((row) => row.map((tile) => ({ ...tile })));

      const yellowLetterCount: Record<string, number> = {}

      // check for correct

      for (const row of newTileProps) {
        for (const tile of row) {
          const guessedLetter = currentGrid[tile.coordinates[0]][tile.coordinates[1]];
          const correctLetter = solutionGrid[tile.coordinates[0]][tile.coordinates[1]];

          const isCorrect = correctLetter === guessedLetter;

          if (isCorrect) {
            let count;
            count = yellowLetterCount[guessedLetter];
            yellowLetterCount[guessedLetter] = count ? count + 1 : 1;

            tile.tileState = "correct-place";
            tile.disabled = true;
          }
        }
      }

      // check for yellow

      for (const row of newTileProps) {
        for (const tile of row) {
          const guessedLetter = currentGrid[tile.coordinates[0]][tile.coordinates[1]];

          const isYellow = words.some((word) => word.includes(guessedLetter));

          if (isYellow) {
            let count;
            count = yellowLetterCount[guessedLetter];
            yellowLetterCount[guessedLetter] = count ? count + 1 : 1;

            if (yellowLetterCount[guessedLetter] <= solutionLetterCounts[guessedLetter]) {
              tile.tileState = "wrong-place";
            }
          } else {
            tile.tileState = "incorrect";
          }
          tile.disabled = true;
        }
      }

      let newGridPropsList = gridPropsList.map((grid) => grid.map((row) => row.map((prop) => prop)));

      setGridPropsList([...newGridPropsList.slice(0, -1), newTileProps]);
    }
    else {
      setMsg("Please valid words!");
    }
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
        {msg !== "" ?
          <p>{msg}</p> : null
        }
    </div>
  );
}

export default Game;
