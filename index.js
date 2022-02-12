const express = require("express");
const path = require("path");
const cors = require("cors");
const { wordleHelper } = require("./wordle_solver.js");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/static", express.static(path.join(__dirname, "static")));

// sendFile will go here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./static/index.html"));
});

app.post("/guess", function (req, res) {
  const { guessWord, excluded, included } = req.body;
  const words = wordleHelper(guessWord, excluded, included);
  res.json(words);
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
