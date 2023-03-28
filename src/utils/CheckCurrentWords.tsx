import Words from "../data/words.json";

const checkCurrentWords = (currentGrid: string[][], gameShape: number[]) => {
  let word1 = "";
  let word2 = "";
  for(let i=0; i <5; i++) {
    word1 = word1.concat(currentGrid[gameShape[1]][i]);
  }
  for(let i=0; i <5; i++) {
    word2 = word2.concat(currentGrid[i][gameShape[0]]);
  }

  const wordsAreValid = Words.includes(word1) && Words.includes(word2)

  console.log(gameShape);
  console.log(word1);
  console.log(word1, word2, wordsAreValid);
  return { word1, word2, wordsAreValid }
}

export default checkCurrentWords;
