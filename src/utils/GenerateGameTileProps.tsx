import { TileProps } from "../components/Tile/Tile";

const GenerateGameTileProps = (answersGrid: string[][]) => {
  let tileProps : TileProps[][] = [];

  for (let r = 0; r < 5; r++) {
    tileProps.push([]);
    for (let c = 0; c < 5; c++){
      if (answersGrid[r][c] !== ""){
        tileProps[r].push({ disabled: false, coordinates: [r, c], tileState: "incorrect", isInput: true, chosenLetter: "" });
      }
      else {
        tileProps[r].push({ disabled: false, coordinates: [r, c], tileState: "incorrect", isInput: false, chosenLetter: "" });
      }
    }
  }



  return tileProps;
}

export default GenerateGameTileProps;
