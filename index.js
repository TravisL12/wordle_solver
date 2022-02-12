const express = require("express");
const path = require("path");
const cors = require("cors");
const { wordleHelper } = require("./wordle_solver.js");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use("/static", express.static(path.join(__dirname, "static")));

// sendFile will go here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./static/index.html"));
});

app.get("/guess", function (req, res) {
  // const guessWord = argv[2];
  // const excludedLetters = argv[3];
  // const includedLetters = argv[4];
  const words = wordleHelper(" r   ");
  res.json(words);
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
