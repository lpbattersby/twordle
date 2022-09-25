import { TwordleTileProps } from "../components/TwordleTile/TwordleTile";

const GenerateDefaultTileProps = () => {
  const size = 25;
  let tiles : TwordleTileProps[] = [];

  for (let i = 0; i < size; i++) {
    tiles.push({ disabled: true, letter: "", state: "incorrect" });
  }

  return tiles;
}

export default GenerateDefaultTileProps;
