import { TwordleTileProps } from "../components/TwordleTile/TwordleTile";

const GenerateGameTileProps = (gameGrid: string[][]) => {
  let tileProps : TwordleTileProps[][] = [];

  for (let r = 0; r < 5; r++) {
    tileProps.push([]);
    for (let c = 0; c < 5; c++){
      if (gameGrid[r][c] !== ""){
        tileProps[r].push({ disabled: false, coordinates: [r, c], tileType: "incorrect", isInput: true });
      }
      else {
        tileProps[r].push({ disabled: false, coordinates: [r, c], tileType: "incorrect", isInput: false });
      }
    }
  }



  return tileProps;
}

export default GenerateGameTileProps;
