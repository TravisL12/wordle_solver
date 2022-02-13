(function () {
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

    const url = `${window.location.href}guess`;
    const resp = await fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const results = await resp.json();
    const possibleWords = results.reduce((acc, word) => {
      const split = word.split("");
      const styledWord = split.map((letter, i) => {
        let letterClass = "";
        if (split[i] === guessWord[i]) {
          letterClass = "match";
        } else if (includedLetters.includes(split[i])) {
          letterClass = "included";
        }
        return `<span class="${letterClass}">${letter}</span>`;
      });
      acc += `<div class="word">${styledWord.join("")}</div>`;
      return acc;
    }, "");

    resultsEl.innerHTML = `
      <div>${results.length} results found!</div>
      <div class="possible-words">${possibleWords}</div>
    `;
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
})();
