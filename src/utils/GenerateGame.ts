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
    console.log(word1Index, word2Index)
    return [word1Index, word2Index];
  }

  const [ word1Row, word2Column ] = FindCommonLetterIndices();

  const GenerateGameGrid = (word2Column: number, word1Row: number) => {
    let gameGrid: string[][] = [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ];

    for (let i in word1.split("")){
      gameGrid[word2Column][i] = word1[i]
    }

    for (let i in word2.split("")){
      gameGrid[i][word1Row] = word2[i]
    }

    return gameGrid;
  }

  return GenerateGameGrid(word2Column, word1Row);
}

export default GenerateGame;
