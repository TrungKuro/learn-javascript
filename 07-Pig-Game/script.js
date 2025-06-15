'use strict';
// Player 1 is TRUE, Player 2 is FALSE
let userCurrent = true;

// Current score for each player
let currentScorePlayer1 = 0;
let currentScorePlayer2 = 0;

// Total score for each player
let totalScorePlayer1 = 0;
let totalScorePlayer2 = 0;

const WINNING_SCORE = 30;

/* ------------------------------------------------------------------------- */

let displayCurrentScorePlayer1 = document.querySelector('#current--0');
let displayCurrentScorePlayer2 = document.querySelector('#current--1');

let displayTotalScorePlayer1 = document.querySelector('#score--0');
let displayTotalScorePlayer2 = document.querySelector('#score--1');

let displayPlayer1 = document.querySelector('.player--0');
let displayPlayer2 = document.querySelector('.player--1');

/* ------------------------------------------------------------------------- */

// Reset the game
function resetGame() {
  // Reset the current player, default to Player 1
  userCurrent = true;
  displayCurrentPlayer(userCurrent);
  displayPlayer1.classList.remove('player--winner');
  displayPlayer2.classList.remove('player--winner');

  // Reset the current score for each player
  currentScorePlayer1 = 0;
  currentScorePlayer2 = 0;
  displayCurrentScorePlayer1.textContent = currentScorePlayer1;
  displayCurrentScorePlayer2.textContent = currentScorePlayer2;

  // Reset the score for each player
  totalScorePlayer1 = 0;
  totalScorePlayer2 = 0;
  displayTotalScorePlayer1.textContent = totalScorePlayer1;
  displayTotalScorePlayer2.textContent = totalScorePlayer1;

  // Enable the roll and hold buttons
  btnRoll.disabled = false;
  btnHold.disabled = false;

  console.log('Resetting the game...');
}

// Run the first time the page loads
window.onload = function () {
  resetGame();
};

// Reset the game when the new game button is clicked
const btnNew = document.querySelector('.btn--new');
btnNew.addEventListener('click', resetGame);

/* ------------------------------------------------------------------------- */

// Roll the dice when the roll dice button is clicked
const btnRoll = document.querySelector('.btn--roll');
btnRoll.addEventListener('click', function () {
  // Generate a random number between 1 and 6
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  console.log(randomNumber);

  // Display the dice image
  document.querySelector('.dice').src = `dice-${randomNumber}.png`;

  // If the dice is 1, clear the current score and switch to the next player
  if (randomNumber === 1) {
    clearCurrentScore();
    switchPlayer();
  } else {
    // Add the random number to the current score
    if (userCurrent) {
      currentScorePlayer1 += randomNumber;
      displayCurrentScorePlayer1.textContent = currentScorePlayer1;
    } else {
      currentScorePlayer2 += randomNumber;
      displayCurrentScorePlayer2.textContent = currentScorePlayer2;
    }
  }
});

/* ------------------------------------------------------------------------- */

// Hold the current score when the hold button is clicked
const btnHold = document.querySelector('.btn--hold');
btnHold.addEventListener('click', function () {
  // Add the current score to the score
  if (userCurrent) {
    totalScorePlayer1 += currentScorePlayer1;
    displayTotalScorePlayer1.textContent = totalScorePlayer1;

    // Check if Player 1 has won
    if (totalScorePlayer1 >= WINNING_SCORE) {
      console.log('Player 1 wins!');
      displayPlayerWinner(userCurrent);
    } else {
      clearCurrentScore();
      switchPlayer();
    }
  } else {
    totalScorePlayer2 += currentScorePlayer2;
    displayTotalScorePlayer2.textContent = totalScorePlayer2;

    // Check if Player 2 has won
    if (totalScorePlayer2 >= WINNING_SCORE) {
      console.log('Player 2 wins!');
      displayPlayerWinner(userCurrent);
    } else {
      clearCurrentScore();
      switchPlayer();
    }
  }
});

/* ------------------------------------------------------------------------- */

function displayCurrentPlayer(player) {
  if (player) {
    displayPlayer1.classList.add('player--active');
    displayPlayer2.classList.remove('player--active');
  } else {
    displayPlayer2.classList.add('player--active');
    displayPlayer1.classList.remove('player--active');
  }
}

/* ------------------------------------------------------------------------- */

function displayPlayerWinner(player) {
  if (player) {
    displayPlayer1.classList.add('player--winner');
  } else {
    displayPlayer2.classList.add('player--winner');
  }

  btnRoll.disabled = true;
  btnHold.disabled = true;
}

/* ------------------------------------------------------------------------- */

function switchPlayer() {
  userCurrent = !userCurrent;
  displayCurrentPlayer(userCurrent);
  console.log('Switching to the next player...');
}

/* ------------------------------------------------------------------------- */

function clearCurrentScore() {
  if (userCurrent) {
    currentScorePlayer1 = 0;
    displayCurrentScorePlayer1.textContent = currentScorePlayer1;
  } else {
    currentScorePlayer2 = 0;
    displayCurrentScorePlayer2.textContent = currentScorePlayer2;
  }
}
