import React, { ChangeEvent, useEffect, useState } from 'react';
import './Tile.css';

type TileState = "correct-place" | "wrong-place" | "incorrect";

export interface TileProps extends React.HTMLProps<any> {
  disabled : boolean,
  tileState: TileState,
  onLetterChange: (letter: string, coordinates: [number, number]) => void,
  isInput: boolean,
  coordinates: [number, number]
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

const Tile = ({ tileState, disabled, coordinates, isInput, onLetterChange }: TileProps) => {
  const [ currentLetter, setCurrentLetter ] = useState("");
  const [ color, setColor ] = useState("#333333");

  useEffect(() => {
    setColor(getBackgroundColor(isInput, tileState));
  }, [tileState]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentLetter(e.target.value);
    onLetterChange(e.target.value, coordinates);
  };

  return (
    <div className="Tile" style={{backgroundColor: color}}>
      {isInput ?
        <input
          className={"TileInput"}
          disabled={disabled}
          value={currentLetter.toUpperCase()}
          maxLength={1}
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
