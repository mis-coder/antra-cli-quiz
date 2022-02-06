#!/usr/bin/env node
import {
  showTitle,
  getPlayerName,
  welcome,
  playQuiz,
  endGame,
  checkAnswers,
} from "./controller/quiz.js";

//introduction
showTitle();
await getPlayerName();
await welcome();

//quiz
const answers = await playQuiz();

//end game
const result = await checkAnswers(answers);
endGame(result);
