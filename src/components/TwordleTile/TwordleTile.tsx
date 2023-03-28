import React, { ChangeEvent, useContext, useState } from 'react';
import './TwordleTile.css';
import AppContext from "../AppContext";

type States = "correct-place" | "wrong-place" | "incorrect" | "input";

export interface TwordleTileProps extends React.HTMLProps<any> {
  disabled : boolean,
  isInput : boolean,
  state: States,
  coordinates: number[]
}

const TwordleTile = ({ state, disabled, isInput, coordinates }: TwordleTileProps) => {
  const [ letter, setLetter ] = useState("");
  const { currentGuessGrid, setCurrentGuessGrid } = useContext(AppContext)!;

  const backgroundColor = () => {
    if (!isInput) {
      return "#333333";
    }
    else {
      switch (state) {
        case "correct-place":
          return "#0c7a30";
        case "incorrect":
          return "#777777";
        case "wrong-place":
          return "#c58c0c";
      }
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLetter(e.target.value);
    let newGuessGrid = currentGuessGrid;
    newGuessGrid[coordinates[0]][coordinates[1]] = e.target.value;
    setCurrentGuessGrid(newGuessGrid);
  };

  return (
    <div className="TwordleTile" style={{backgroundColor: backgroundColor()}}>
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
