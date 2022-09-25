const GenerateGame = (word1: string, word2: string) => {

  const FindCommonLetterIndices = () => {
    let word1Index = -1;
    let word2Index = -1;

    for (const letter of word1.split("")) {
      word2Index = word2.indexOf(letter);
      if (word2Index !== -1) {
        word1Index = word1.indexOf(letter);
        break;
      }
    }

    return [word1Index, word2Index];
  }

  const [ word1Row, word2Column ] = FindCommonLetterIndices();

  const GenerateGameGrid = (word1Row: number, word2Column: number) => {
    let gameGrid: string[][] = [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ];

    for (let i in word1.split("")){
      gameGrid[word1Row][i] = word1[i]
    }

    for (let i in word2.split("")){
      gameGrid[i][word2Column] = word2[i]
    }

    return gameGrid;
  }

  return GenerateGameGrid(word1Row, word2Column);
}

export default GenerateGame;
