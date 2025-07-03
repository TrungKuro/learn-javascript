"use strict";

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const ages_1 = [5, 2, 4, 1, 15, 8, 3];
const ages_2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
  // Chuyển đổi tuổi chó sang tuổi người
  const humanAges = ages.map(function (age) {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + age * 4;
    }
  });
  // console.log(humanAges);

  // Loại trừ các chó có tuổi dưới 18 tuổi người
  const adultDogs = humanAges.filter(function (age) {
    return age >= 18;
  });
  // console.log(adultDogs);

  // Tính tuổi trung bình của các chó trưởng thành
  const averageHumanAge = adultDogs.reduce(function (acc, curr) {
    return acc + curr / adultDogs.length;
  }, 0);
  // console.log(averageHumanAge);

  return Math.round(averageHumanAge);
};

console.log("Test Data 1");
console.log(calcAverageHumanAge(ages_1));
console.log("Test Data 2");
console.log(calcAverageHumanAge(ages_2));
