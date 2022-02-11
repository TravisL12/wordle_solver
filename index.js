const fs = require("fs");
const { argv } = require("process");
const WORD_LENGTH = 5;

const filterWords = (words, guessWord, excludedLetters, includedLetters) => {
  if (guessWord.length !== 5) {
    console.error(
      "Guess word must be 5 characters (use blank spaces for unknown letters)!"
    );
    return;
  }

  // regex look ahead from https://stackoverflow.com/a/18643205/2879650
  const excludedRule = excludedLetters ? `([^${excludedLetters}])` : `.`;
  const includeRule = includedLetters
    ? includedLetters
        .split("")
        .map((x) => `(?=.*${x})`)
        .join("")
    : `.`;

  const matchRe = new RegExp(guessWord.replace(/\s/gi, `(.)`));
  const includeWordRe = new RegExp(includeRule);
  const excludeWordRe = new RegExp(guessWord.replace(/\s/gi, excludedRule));

  return words.filter((word) => {
    const isPossible = matchRe.test(word) && includeWordRe.test(word);
    return isPossible && excludeWordRe.test(word);
  });
};

try {
  const data = fs.readFileSync("./dictionary.txt", "utf8");
  const words = data.split("\n").filter((word) => word.length === WORD_LENGTH);
  const guessWord = argv[2];
  const excludedLetters = argv[3];
  const includedLetters = argv[4];
  const possibleWords = filterWords(
    words,
    guessWord,
    excludedLetters,
    includedLetters
  );
  console.log(possibleWords);
} catch (err) {
  console.error(err);
}
