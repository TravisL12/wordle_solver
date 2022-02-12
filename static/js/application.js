const guessButton = document.getElementById("guess");
const resultsEl = document.getElementById("results");
const form = document.getElementById("wordleForm");
const includedLetters = document.getElementById("included");
const excludedLetters = document.getElementById("excluded");
const inputs = document.querySelectorAll('input[type="text"].guess');

const fetchGuess = async (guessWord, excludedLetters, includedLetters) => {
  resultsEl.textContent = "";
  const body = JSON.stringify({
    guessWord: guessWord,
    excluded: excludedLetters,
    included: includedLetters,
  });

  const url = `/guess`;
  const resp = await fetch(url, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const results = await resp.json();
  resultsEl.textContent = `This many results - ${results.join(" ")}`;
};

const renderOutput = (results) => {
  output.innerHTML = "";
  output.innerHTML = results.reduce((acc, word) => {
    acc += `<p>${word}</p>`;
    return acc;
  }, "");
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let guessWord = "";
  [...inputs].forEach((input) => {
    if (input.value) {
      guessWord += input.value;
    } else {
      guessWord += " ";
    }
  });

  fetchGuess(guessWord, excludedLetters.value, includedLetters.value);
});
