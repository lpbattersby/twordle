import React, { useEffect, useState } from 'react';
import './Grid.css';
import checkCurrentWords from "../../utils/CheckCurrentWords";
import GenerateTiles from "../../utils/GenerateTiles";
import Tile, { TileProps } from "../Tile/Tile";

export interface GridProps extends React.HTMLProps<any> {
  isActive: boolean,
  solution: string[][],
  gameShape: [number, number],
  solutionLetterCounts: Record<string, number>,
  handleGridComplete: () => void,
  number: number,
}

const Grid = ({ gameShape, solution, solutionLetterCounts, handleGridComplete, number }: GridProps) => {
  const [ tiles, setTiles ] = useState<TileProps[][]>([]);
  const [ isActive, setIsActive ] = useState<boolean>(true);
  const [ msg, setMsg ] = useState("");
  const [letters, setLetters] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ]);

  useEffect(() => {
    if(tiles.length === 0) {
      setTiles(GenerateTiles(solution, onLetterChange));
    }
  }, [])

  const checkWords = () => {
    const { wordsAreValid } = checkCurrentWords(letters, gameShape);
    console.log(checkCurrentWords(letters, gameShape));

    return wordsAreValid;
  }

  const onLetterChange = (letter: string, coordinates: [number, number]) => {
    const newLetters = letters.slice();
    letters[coordinates[0]][coordinates[1]] = letter;
    setLetters(newLetters);
  }

  const submitGrid = () => {
    const newTiles = tiles.slice();

    const yellowLetterCount: Record<string, number> = {}

    // check for correct

    for (const row of newTiles) {
      for (const tile of row) {
        const guessedLetter = letters[tile.coordinates[0]][tile.coordinates[1]];
        const correctLetter = solution[tile.coordinates[0]][tile.coordinates[1]];

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

    for (const row of newTiles) {
      for (const tile of row) {
        const guessedLetter = letters[tile.coordinates[0]][tile.coordinates[1]];
        const isYellow = solution.some((row) => row.includes(guessedLetter));

        if (isYellow) {
          let count;
          count = yellowLetterCount[guessedLetter];
          yellowLetterCount[guessedLetter] = count ? count + 1 : 1;

          if (yellowLetterCount[guessedLetter] <= solutionLetterCounts[guessedLetter]) {
            tile.tileState = "wrong-place";
          }
        }
        else {
          tile.tileState = "incorrect";
        }
        tile.disabled = true;
      }
    }

    setTiles(newTiles);
    setIsActive(false);
  }

  const handleSubmit = () => {
    if(checkWords()){
      submitGrid();
      handleGridComplete();
    }
    else {
      setMsg("Please use valid words!")
    }
  }

  return (
    <div className="Grid" key={number}>
      {tiles.map((row, rowNumber) => {
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
      {isActive ?
        <div>
          <button onClick={() => handleSubmit()}>Submit</button>
          {msg !== "" ?
            <p>{msg}</p> : null
          }
        </div>
         : null
      }
    </div>
  )
}

Grid.defaultProps = {
 isActive: true,
}

export default Grid;
