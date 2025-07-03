"use strict";

///////////////////////////////////////
// Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/
/* ------------------------------------------------------------------------- */

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John", "Leo"] },
  { weight: 18, curFood: 244, owners: ["Joe"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// Công thức tính khẩu phần ăn khuyến nghị:
// Kết quả tính bằng (gam) thực phẩm và "weight" tính bằng (kg)
const recommendedFood = (weight) => Math.floor(Number(weight) ** 0.75 * 28);

// "Ăn quá nhiều" có nghĩa là khẩu phần ăn hiện tại của chó lớn hơn khẩu phần khuyến nghị, và "ăn quá ít" thì ngược lại
// Ăn một lượng thức ăn hợp lý có nghĩa là ...
// ... khẩu phần ăn hiện tại của chó nằm trong phạm vi cao hơn và thấp hơn (10%) so với khẩu phần khuyến nghị (xem gợi ý)
const checkRecFood = (curFood, recFood) =>
  curFood > recFood * 1.1
    ? "too-much"
    : curFood < recFood * 0.9
    ? "too-little"
    : "exact";

// 1. Lặp qua mảng chứa các đối tượng chó và đối với mỗi con chó
//    Tính toán khẩu phần thức ăn được khuyến nghị (recFood) và thêm vào đối tượng như một thuộc tính mới
//    KHÔNG tạo một mảng mới, chỉ cần lặp qua mảng
// (Chúng tôi chưa bao giờ làm điều này trước đây, vì vậy hãy nghĩ về cách bạn có thể làm điều này mà không cần tạo một mảng mới)
dogs.forEach((dog) => (dog["recFood"] = recommendedFood(dog.weight)));
console.log(dogs);

// 2. Tìm chú chó của Sarah và ghi vào bảng điều khiển xem nó ăn quá nhiều hay quá ít
//    GỢI Ý: Một số chú chó có nhiều người dùng
//           Vì vậy trước tiên bạn cần tìm Sarah trong mảng chủ sở hữu
//           Và điều này hơi khó một chút (có chủ đích) 🤓
dogs.forEach((dog) =>
  dog.owners.includes("Sarah")
    ? console.log(checkRecFood(dog.curFood, dog.recFood))
    : null
);

// 3. Tạo một mảng chứa tất cả chủ sở hữu của những chú chó ăn quá nhiều (ownersTooMuch)
//    Và một mảng chứa tất cả chủ sở hữu của những chú chó ăn quá ít (ownersTooLittle)
const ownersTooMuch = dogs.flatMap((dog) =>
  checkRecFood(dog.curFood, dog.recFood) === "too-much" ? dog.owners : []
);
console.log(ownersTooMuch);
//
const ownersTooLittle = dogs.flatMap((dog) =>
  checkRecFood(dog.curFood, dog.recFood) === "too-little" ? dog.owners : []
);
console.log(ownersTooLittle);

// 4. Ghi một chuỗi vào bảng điều khiển cho mỗi mảng được tạo trong câu [3.]
//    Như thế này: "Những chú chó của Matilda, Alice và Bob ăn quá nhiều!"
//    Và "Những chú chó của Sarah, John và Michael ăn quá ít!"
console.log(`${ownersTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersTooLittle.join(" and ")}'s dogs eat too little!`);

// 5. Ghi vào bảng điều khiển xem có con chó nào ăn ĐÚNG lượng thức ăn được khuyến nghị hay không (chỉ đúng hoặc sai)
// console.log(
//   dogs.some((dog) => checkRecFood(dog.curFood, dog.recFood) === "exact")
// );
//
// HOẶC: sử dụng Destructuring sẵn luôn
//
console.log(
  dogs.some(
    ({ curFood, recFood }) => checkRecFood(curFood, recFood) === "exact"
  )
);

// 6. Ghi vào bảng điều khiển xem TẤT CẢ các chú chó có ăn một lượng thức ăn ĐÚNG không (chỉ đúng hoặc sai)
// console.log(
//   dogs.every((dog) => checkRecFood(dog.curFood, dog.recFood) === "exact")
// );
//
// HOẶC: sử dụng Destructuring sẵn luôn
//
console.log(
  dogs.every(
    ({ curFood, recFood }) => checkRecFood(curFood, recFood) === "exact"
  )
);

// 7. Tạo một mảng chứa những chú chó đang ăn một lượng thức ăn TỐT (thử sử dụng lại điều kiện đã sử dụng ở câu [6.])
// console.log(
//   dogs.filter((dog) => checkRecFood(dog.curFood, dog.recFood) === "exact")
// );
//
// HOẶC: sử dụng Destructuring sẵn luôn
//
console.log(
  dogs.filter(
    ({ curFood, recFood }) => checkRecFood(curFood, recFood) === "exact"
  )
);

// 8. Phân loại chó thành 3 nhóm sau: 'exact', 'too-much' and 'too-little'
//    Dựa trên việc chúng ăn quá nhiều, quá ít hay lượng thức ăn chính xác, dựa trên khẩu phần thức ăn được khuyến nghị
console.log(
  Object.groupBy(dogs, ({ curFood, recFood }) => checkRecFood(curFood, recFood))
);

// 9. Nhóm những chú chó theo số lượng chủ sở hữu của chúng
console.log(Object.groupBy(dogs, ({ owners }) => `${owners.length}-owners`));
//
// HOẶC: với việc nhóm dữ liệu, có thể thêm reduce() như một lựa chọn thay thế cho Object.groupBy()
//
// console.log(
//   dogs.reduce((acc, dog) => {
//     const key = `${dog.owners.length}-owners`;
//     acc[key] = acc[key] || [];
//     acc[key].push(dog);
//     return acc;
//   }, {})
// );

// 10. Sắp xếp mảng chó theo khẩu phần thức ăn được khuyến nghị theo thứ tự tăng dần
//     Đảm bảo KHÔNG làm thay đổi mảng ban đầu!
// const sortDogs = dogs.toSorted((a, b) => a.recFood - b.recFood);
// console.log(sortDogs);
//
// HOẶC: với việc sắp xếp, có thể thêm các tiêu chí phụ nếu cần
//
const sortDogs = dogs.toSorted((a, b) => {
  // Sắp xếp theo recFood trước
  const byFood = a.recFood - b.recFood;
  if (byFood !== 0) return byFood;
  // Nếu recFood bằng nhau, sắp xếp theo số lượng chủ
  return a.owners.length - b.owners.length;
});
console.log(sortDogs);
