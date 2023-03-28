import React, { useContext } from 'react';
import './TwordleTile.css';
import AppContext from "../AppContext";

type States = "correct-place" | "wrong-place" | "incorrect" | "input";

export type TwordleTileProps = {
  disabled : boolean,
  isInput : boolean,
  state: States,
  coordinates: number[]
}

const TwordleTile = (props: TwordleTileProps) => {
  const { state, disabled, isInput, coordinates } = props;
  const { currentGuessGrid } = useContext(AppContext)!;

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

  return (
    <div className="TwordleTile" style={{backgroundColor: backgroundColor()}}>
      {isInput ? currentGuessGrid[coordinates[0]][coordinates[1]] : null}
    </div>
  )
}

TwordleTile.defaultProps = {
  disabled: false,
  isInput: false,
  state: "incorrect"
}

export default TwordleTile;
