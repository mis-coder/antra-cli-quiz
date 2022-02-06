import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";

import { answers } from "../assets/data/answers.js";
import { questions } from "../assets/data/questions.js";

let playerName;

//clear the console
const clearConsole = () => {
  console.clear();
};

//show game title
export const showTitle = () => {
  console.log(`\n\t\t\t\t---*---*--THE CLI QUIZ--*---*---\n`);
};

//player name
export const getPlayerName = async () => {
  const playerInfo = await inquirer.prompt({
    name: "name",
    type: "input",
    message: "Enter player name: ",
  });

  playerName = playerInfo.name;
};

//show introduction
export const welcome = async () => {
  clearConsole();
  console.log(
    `\n Hi ${chalk.green(playerName)}, welcome to the quiz game!\n
  ${chalk.yellow(`You will be asked five basic questions.
  If you answer them all correctly, you win!
  else..... try again :)`)}\n\n`
  );

  await inquirer.prompt({
    name: "enterKey",
    type: "input",
    message: "Press enter key to start the game",
  });
};

//do something if player lost
export const playerLost = () => {
  clearConsole();
  console.log(chalk.bgRed("Oops! you lost."));
};

//do something if player won
export const playerWon = () => {
  clearConsole();
  const message = `congrats ${playerName} !`;

  figlet(message, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
};

//get user answers
export const playQuiz = async () => {
  clearConsole();

  //prompt questions
  const userAnswers = await inquirer.prompt(
    questions.map((question) => ({
      name: question.name,
      type: "list",
      message: question.message,
      choices: [...question.choices],
    }))
  );

  return userAnswers;
};

//check if all answers are correct
export const checkAnswers = async (userAnswers) => {
  let flag = true;
  answers.forEach((answer, index) => {
    if (userAnswers[`question${index}`] !== answer) {
      flag = false;
    }
  });
  return flag;
};

//end game based on the result
export const endGame = (result) => {
  if (result) {
    playerWon();
  } else {
    playerLost();
  }
};
