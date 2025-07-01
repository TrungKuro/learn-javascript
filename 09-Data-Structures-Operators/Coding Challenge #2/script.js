"use strict";

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/* ------------------------------------------------------------------------- */

// 1. Loop over the game.scored array
//    And print each player name to the console
//    Along with the goal number (Example: "Goal 1: Lewandowski")
for (const [index, goal] of game.scored.entries()) {
  console.log(`Goal ${Number(index) + 1}: ${goal}`);
}

// 2. Use a loop to calculate the average odd and log it to the console
//    (We already studied how to calculate averages, you can go check if you don't remember)
let averageOdd = 0;
const odds = Object.values(game.odds);
for (const odd of odds) {
  averageOdd += odd;
}
averageOdd /= odds.length;
console.log(`Average odd: ${averageOdd.toFixed(2)}`);

// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//    Odd of victory Bayern Munich: 1.33
//    Odd of draw: 3.25
//    Odd of victory Borrussia Dortmund: 6.5
//    Get the team names directly from the game object, don't hardcode them (except for "draw")
//    HINT: Note how the odds and the game objects have the same property names 😉

// Cách cũ:
// console.log(`Odd of victory ${game.team1}: ${game.odds.team1}`);
// console.log(`Odd of draw: ${game.odds.x}`);
// console.log(`Odd of victory ${game.team2}: ${game.odds.team2}`);

// Cách mới:
const objOdds = Object.entries(game.odds);
for (const [team, value] of objOdds) {
  console.log(
    `Odd of ${team === "x" ? "draw" : `victory ${game[team]}`}: ${value}`
  );
}

// BONUS: Create an object called 'scorers'
//        Which contains the names of the players who scored as properties
//        And the number of goals as the value
// In this game, it will look like this:
// {
//   Gnarby: 1,
//   Hummels: 1,
//   Lewandowski: 2
// }

const allPlayers = [...game.players[0], ...game.players[1]];
console.log(allPlayers);

const scorers = {};
for (const player of allPlayers) {
  let score = 0;
  for (const goal of game.scored) {
    if (player === goal) {
      score++;
    }
  }
  // if (score) scorers[player] = score;
  score && (scorers[player] = score);
}

console.log(scorers);
