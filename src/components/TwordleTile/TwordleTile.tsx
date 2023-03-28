import React from 'react';
import './TwordleTile.css';

type States = "correct-place" | "wrong-place" | "incorrect" | "input";

export type TwordleTileProps = {
  disabled : boolean,
  state: States,
  letter: string
}

const TwordleTile = (props: TwordleTileProps) => {
  const { state, disabled, letter } = props;

  const backgroundColor = () => {
    if (disabled) {
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
      {!disabled ? letter : null}
    </div>
  )
}

TwordleTile.defaultProps = {
  disabled: false,
  state: "incorrect",
  letter: ""
}

export default TwordleTile;
