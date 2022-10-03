import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './TwordleTile.css';
import AppContext from "../AppContext";

type TileType = "correct-place" | "wrong-place" | "incorrect";

export interface TwordleTileProps extends React.HTMLProps<any> {
  disabled : boolean,
  isInput : boolean,
  tileType: TileType,
  coordinates: number[]
}

const getBackgroundColor = (isInput: boolean, state: TileType) => {
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

const TwordleTile = ({ tileType, disabled, isInput, coordinates }: TwordleTileProps) => {
  const [ letter, setLetter ] = useState("");
  const { currentGuessGrid, setCurrentGuessGrid } = useContext(AppContext)!;
  const [ color, setColor ] = useState("#333333");

  useEffect(() => {
    setColor(getBackgroundColor(isInput, tileType));
  }, [tileType, isInput]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLetter(e.target.value);
    let newGuessGrid = currentGuessGrid;
    newGuessGrid[coordinates[0]][coordinates[1]] = e.target.value;
    setCurrentGuessGrid(newGuessGrid);
  };

  return (
    <div className="TwordleTile" style={{backgroundColor: color}}>
      {isInput && !disabled ?
        <input
          className={"TwordleTileInput"}
          value={letter.toUpperCase()}
          onChange={(e) => handleOnChange(e)}
        /> : null
      }
    </div>
  )
}

TwordleTile.defaultProps = {
  disabled: false,
  isInput: false,
  state: "incorrect"
}

export default TwordleTile;
