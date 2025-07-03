"use strict";

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/* ------------------------------------------------------------------------- */

const ages_1 = [5, 2, 4, 1, 15, 8, 3];
const ages_2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(function (age) {
//     if (age <= 2) {
//       return 2 * age;
//     } else {
//       return 16 + age * 4;
//     }
//   });
//   const adultDogs = humanAges.filter(function (age) {
//     return age >= 18;
//   });
//   const averageHumanAge = adultDogs.reduce(function (acc, curr) {
//     return acc + curr / adultDogs.length;
//   }, 0);
//   return Math.round(averageHumanAge);
// };

const calcAverageHumanAge = (ages) =>
  Math.round(
    ages
      .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
      .filter((age) => age >= 18)
      .reduce((acc, curr, _, arr) => acc + curr / arr.length, 0)
  );

console.log("Test Data 1");
console.log(calcAverageHumanAge(ages_1));
console.log("Test Data 2");
console.log(calcAverageHumanAge(ages_2));
