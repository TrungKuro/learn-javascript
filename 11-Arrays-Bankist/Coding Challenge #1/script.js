"use strict";

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/* ------------------------------------------------------------------------- */

// With case Test Data 1
const juliaDogs_1 = [3, 5, 2, 12, 7]; // Data wrong
const kateDogs_1 = [4, 1, 15, 8, 3];
// Remove data wrong
juliaDogs_1.splice(0, 1);
juliaDogs_1.splice(-2);
// Merge data
const dogs_1 = [...juliaDogs_1, ...kateDogs_1];
// Log data
console.log("Test Data 1");
checkDogs(dogs_1);

// With case Test Data 2
const juliaDogs_2 = [9, 16, 6, 8, 3]; // Data wrong
const kateDogs_2 = [10, 5, 6, 1, 4];
// Remove data wrong
juliaDogs_2.splice(0, 1);
juliaDogs_2.splice(-2);
// Merge data
const dogs_2 = [...juliaDogs_2, ...kateDogs_2];
// Log data
console.log("Test Data 2");
checkDogs(dogs_2);

/* ------------------------------------------------------------------------- */

function checkDogs(dogs) {
  dogs.forEach(function (dog, index) {
    if (dog >= 3) {
      console.log(
        `Dog number ${index + 1} is an adult, and is ${dog} years old`
      );
    } else {
      console.log(`Dog number ${index + 1} is still a puppy 🐶`);
    }
  });
}
