import Games from "../../data/games.json";
import GenerateGame from "../../utils/GenerateGame";
import dateDiffInDays from "../../utils/DateDiffInDays";
import Grid, { GridProps } from "../Grid/Grid";
import React, { useContext, useEffect, useState } from "react";

function Game() {
  const today = new Date();
  const startDate = new Date(process.env.REACT_APP_INITIAL_DATE!);
  const gameNumber = dateDiffInDays(today, startDate);
  const words = Games[gameNumber];
  const { solution, solutionLetterCounts, gameShape } = GenerateGame(words[0], words[1]);
  const [gridNumber, setGridNumber] = useState(1);

  const handleGridComplete = () => {
    const newNumber = gridNumber + 1;
    setGridNumber(newNumber);
    setGrids([...grids, { isActive: true, number: newNumber }]);
  }

  const [ grids, setGrids ] = useState<Pick<GridProps, "isActive" | "number">[]>([{ isActive: true, number: gridNumber}])

  useEffect(() => {}, [grids])

  return (
    <div>
      {grids.map((grid) => {
        return (
          <Grid
            isActive={grid.isActive}
            number={grid.number}
            gameShape={gameShape}
            solution={solution}
            solutionLetterCounts={solutionLetterCounts}
            handleGridComplete={handleGridComplete}
            key={grid.number}
          />
        )
        })
      }
    </div>
  );
}

export default Game;
