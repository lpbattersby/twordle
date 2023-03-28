import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Tile.css';
import AppContext from "../AppContext";

type TileState = "correct-place" | "wrong-place" | "incorrect";

export interface TileProps extends React.HTMLProps<any> {
  disabled : boolean,
  tileState: TileState,
  chosenLetter: string,
  isInput: boolean,
  coordinates: number[]
}

const getBackgroundColor = (isInput: boolean, state: TileState) => {
  if (!isInput) {
    return "#333333";
  }
  switch (state) {
    case "correct-place":
      return "#0c7a30";
    case "incorrect":
      return "#777777";
    case "wrong-place":
      return "#c58c0c";
  }
};

const Tile = ({ tileState, disabled, coordinates, isInput, chosenLetter }: TileProps) => {
  const [ currentLetter, setCurrentLetter ] = useState("");
  const { currentGrid, setCurrentGrid } = useContext(AppContext)!;
  const [ color, setColor ] = useState("#333333");

  useEffect(() => {
    setColor(getBackgroundColor(isInput, tileState));
  }, [tileState]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentLetter(e.target.value[0] ? e.target.value[0] : e.target.value );
    let newGuessGrid = currentGrid;
    newGuessGrid[coordinates[0]][coordinates[1]] = e.target.value[0] ? e.target.value[0] : e.target.value ;
    setCurrentGrid(newGuessGrid);
  };

  return (
    <div className="Tile" style={{backgroundColor: color}}>
      {isInput && !disabled ?
        <input
          className={"TileInput"}
          value={currentLetter.toUpperCase()}
          onChange={(e) => handleOnChange(e)}
        /> : null
      }
    </div>
  )
}

Tile.defaultProps = {
  disabled: false,
  isInput: false,
  state: "incorrect"
}

export default Tile;
