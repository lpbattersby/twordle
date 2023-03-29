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

  const GenerateAnswersGrid = (word2Column: number, word1Row: number) => {
    let gameGrid: string[][] = [
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

  const GetLetterCount = (word1CommonLetterIndex: number) => {
    const combinedLetters = word1.replace(`${word1[word1CommonLetterIndex]}`, "") + word2;

    let counts : Record<string, number> = {};

    let ch, index, len, count;

    for (index = 0, len = combinedLetters.length; index < len; ++index) {

      ch = combinedLetters.charAt(index);

      count = counts[ch];

      counts[ch] = count ? count + 1 : 1;
    }

    return counts;
  }

  const solution = GenerateAnswersGrid(word2Column, word1Row);
  const solutionLetterCounts = GetLetterCount(word1Row);
  const gameShape: [number, number] = [word1Row, word2Column];

  return { solution, solutionLetterCounts, gameShape };
}

export default GenerateGame;
