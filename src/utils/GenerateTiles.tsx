import { TileProps } from "../components/Tile/Tile";

const GenerateTiles = (answersGrid: string[][], onLetterChange: (letter: string, coordinates: [number, number]) => void) => {
  let tileProps : TileProps[][] = [];

  for (let r = 0; r < 5; r++) {
    tileProps.push([]);
    for (let c = 0; c < 5; c++){
      if (answersGrid[r][c] !== ""){
        tileProps[r].push({ disabled: false, coordinates: [r, c], tileState: "incorrect", isInput: true, onLetterChange: onLetterChange});
      }
      else {
        tileProps[r].push({ disabled: false, coordinates: [r, c], tileState: "incorrect", isInput: false, onLetterChange: onLetterChange});
      }
    }
  }



  return tileProps;
}

export default GenerateTiles;
