import { TwordleTileProps } from "../components/TwordleTile/TwordleTile";

const GenerateGameTileProps = (gameGrid: string[][]) => {
  let tileProps : TwordleTileProps[] = [];

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++){
      if (gameGrid[r][c] !== ""){
        tileProps.push({ disabled: false, letter: "", state: "incorrect" });
      }
      else {
        tileProps.push({ disabled: true, letter: "", state: "incorrect" });
      }
    }
  }



  return tileProps;
}

export default GenerateGameTileProps;
