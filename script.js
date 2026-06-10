'use strict';

const body = document.body;
const messageEl = document.querySelector('.message');
const numberEl = document.querySelector('.number');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const guessEl = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let gameOver = false;

const displayMessage = function (message) {
  messageEl.textContent = message;
};

const resetGame = function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  gameOver = false;

  displayMessage('Start guessing...');
  scoreEl.textContent = score;
  numberEl.textContent = '?';
  guessEl.value = '';
  body.style.backgroundColor = '#222';
  numberEl.style.width = '15rem';
  checkBtn.disabled = false;
};

const endGame = function () {
  gameOver = true;
  checkBtn.disabled = true;
};

checkBtn.addEventListener('click', function () {
  if (gameOver) return;

  const guess = Number(guessEl.value);

  if (!Number.isInteger(guess) || guess < 1 || guess > 20) {
    displayMessage('⛔️ Enter a number from 1 to 20!');
    return;
  }

  if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    numberEl.textContent = secretNumber;
    body.style.backgroundColor = '#60b347';
    numberEl.style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
    }

    endGame();
    return;
  }

  if (score > 1) {
    displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    score--;
    scoreEl.textContent = score;
  } else {
    displayMessage('💥 You lost the game!');
    score = 0;
    scoreEl.textContent = score;
    endGame();
  }
});

againBtn.addEventListener('click', resetGame);
