'use strict';

// Generate a random number from 1 to 20
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);

// Store score when the game starts
let score = 20;
document.querySelector('.score').textContent = score;

// Store high score
let highScore = 0;
document.querySelector('.highscore').textContent = highScore;

/* ------------------------------------------------------------------------- */

// Display message
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

// Reset the game
function resetGame() {
  // Reset style
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  // Reset content
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');

  // Reset secret number
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  console.log(secretNumber);

  // Reset score
  score = 20;
  document.querySelector('.score').textContent = score;
}

/* ------------------------------------------------------------------------- */

// When the user clicks the again button
document.querySelector('.again').addEventListener('click', resetGame);

/* ------------------------------------------------------------------------- */

// When the user clicks the check button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');
  }
  // When player wins
  else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    displayMessage('🎉 Correct number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // Update high score if current score is higher
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  }
  // When the guess is wrong
  else {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      document.querySelector('.score').textContent = --score;
    }
    // When the player loses
    else {
      document.querySelector('.number').textContent = secretNumber;
      displayMessage('💥 You lost the game!');
      score = 0;
      document.querySelector('.score').textContent = score;
    }
  }
});
