const guessButton = document.getElementById("guess");

const fetchGuess = async () => {
  const results = await fetch("/guess");
  console.log(results.json());
};

guessButton.addEventListener("click", fetchGuess);
