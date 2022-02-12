const guessButton = document.getElementById("guess");
const resultsEl = document.getElementById("results");

const fetchGuess = async () => {
  const resp = await fetch("/guess");
  const results = await resp.json();
  resultsEl.textContent = `This many results - ${results.join(" ")}`;
};

guessButton.addEventListener("click", fetchGuess);
