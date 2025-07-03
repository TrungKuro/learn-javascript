"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann", // js
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis", // jd
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams", // stw
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith", // ss
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/* ------------------------------------------------------------------------- */

// Hiển thị dòng tiền của tài khoản trên UI
const displayMovements = function (movements, sort) {
  // Xóa nội dung cũ (mẫu)
  containerMovements.innerHTML = "";

  // sortIcon = TRUE : sắp xếp giảm dần (descending) -> (B - A)
  // sortIcon = FALSE : sắp xếp tăng dần (ascending) -> (A - B)

  // CÁCH CŨ:
  // Cập nhật nội dung mới
  // movements
  //   .slice() // Tạo bản sao của mảng để không làm thay đổi mảng gốc
  //   .sort((a, b) => (sort ? b - a : a - b))
  //   .forEach(function (mov, index) {
  //     const type = mov > 0 ? "deposit" : "withdrawal";
  //     const html = `
  //   <div class="movements__row">
  //     <div class="movements__type movements__type--${type}">${
  //       index + 1
  //     } ${type}</div>
  //     <div class="movements__date">3 days ago</div>
  //     <div class="movements__value">${mov}€</div>
  //   </div>
  //   `;
  //     containerMovements.insertAdjacentHTML("afterbegin", html);
  //   });

  // CÁCH MỚI:
  // Cập nhật nội dung mới
  // Giá trị dòng tiền được sắp xếp
  // Nhưng vẫn giữ số thứ tự giao dịch dòng tiền
  // Và không ảnh hưởng đến mảng goc61
  movements
    .slice() // Tạo bản sao của mảng để không làm thay đổi mảng gốc
    .entries() // Tạo Iterator có các phần tử với dạng [index, value]
    .toArray() // Chuyển Iterator thành mảng 2 chiều
    .sort((a, b) => (sort ? b[1] - a[1] : a[1] - b[1])) // Sắp xếp theo giá trị dòng tiền
    .forEach(function (mov) {
      const type = mov[1] > 0 ? "deposit" : "withdrawal";
      const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
        mov[0] + 1
      } ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov[1]}€</div>
    </div>
    `;
      containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

// TEST
// displayMovements(account1.movements);

/* ------------------------------------------------------------------------- */

// Tính tổng số dư và hiển thị trên UI
const calcDisplayBalance = function (movements) {
  // Tính tổng số dư
  const balance = movements.reduce((acc, curr) => acc + curr, 0);

  // Cập nhật nội dung mới
  labelBalance.textContent = balance + "€";
};

// TEST
// calcDisplayBalance(account1.movements);

/* ------------------------------------------------------------------------- */

// Tính tổng số tiền gửi và rút ra, cả tính lãi và hiển thị trên UI
const calcDisplaySummary = function (movements, interestRate) {
  // Tính tổng số tiền gửi và rút ra
  const income = movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  const expense = movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  // Tính lãi (chỉ tính khi lãi từ 1€ trở lên)
  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  // Cập nhật nội dung mới
  labelSumIn.textContent = income + "€";
  labelSumOut.textContent = Math.abs(expense) + "€";
  labelSumInterest.textContent = interest.toFixed(2) + "€";
};

// TEST
// calcDisplaySummary(account1.movements, account1.interestRate);

/* ------------------------------------------------------------------------- */

// Tạo username cho các tài khoản
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    // Tạo thuộc tính "username" trực tiếp vào object
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

// RUN FIRST TIME
createUsernames(accounts);
// CHECK
// console.log(accounts);

/* ------------------------------------------------------------------------- */

const updateUI = function (curAcc) {
  displayMovements(curAcc.movements, sortIcon);
  calcDisplayBalance(curAcc.movements);
  calcDisplaySummary(curAcc.movements, curAcc.interestRate);
};

/* ------------------------------------------------------------------------- */

// Lưu tài khoản đang đăng nhập
let currentAccount;

// Xử lý đăng nhập
btnLogin.addEventListener("click", function (e) {
  // Ngăn chặn tải lại trang
  e.preventDefault();

  // Lấy username và pin từ input
  const inputUsername = inputLoginUsername.value;
  const inputPin = inputLoginPin.value;
  // console.log(inputUsername, inputPin);

  // Xong rồi xóa input
  inputLoginUsername.value = "";
  inputLoginUsername.blur();
  inputLoginPin.value = "";
  inputLoginPin.blur();

  // Tìm tài khoản có username và pin tương ứng
  currentAccount = accounts.find(
    (acc) => acc.userName === inputUsername && acc.pin === Number(inputPin)
  );
  // console.log(currentAccount);

  // Kiểm tra tài khoản có tồn tại không?
  if (currentAccount) {
    console.log("Login successful");

    // Hiển thị lời chào mừng
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    // Hiển thị dữ liệu
    updateUI(currentAccount);

    // Hiển thị app
    containerApp.style.opacity = "1";
  } else {
    console.log("Login failed");
  }
});

/* ------------------------------------------------------------------------- */

// Xử lý chuyển tiền
btnTransfer.addEventListener("click", function (e) {
  // Ngăn chặn tải lại trang
  e.preventDefault();

  // Lấy số tiền và tài khoản nhận
  const amount = Number(inputTransferAmount.value);
  const toAccount = inputTransferTo.value;
  // console.log(amount, toAccount);

  // Xong rồi xóa input
  inputTransferAmount.value = "";
  inputTransferAmount.blur();
  inputTransferTo.value = "";
  inputTransferTo.blur();

  // Kiểm tra số tiền và tài khoản nhận có hợp lệ không?
  if (
    amount > 0 && // Số tiền phải lớn hơn 0
    toAccount !== currentAccount.userName && // Tài khoản nhận phải khác tài khoản hiện tại
    amount <= currentAccount.movements.reduce((acc, curr) => acc + curr, 0) && // Số tiền phải nhỏ hơn số dư hiện tại
    accounts.map((acc) => acc.userName).includes(toAccount) // Tài khoản nhận phải tồn tại
  ) {
    console.log("Transfer successful");

    // Thêm dòng tiền âm vào tài khoản hiện tại
    currentAccount.movements.push(-amount);
    // console.log(currentAccount.movements);

    // Thêm dòng tiền dương vào tài khoản nhận
    const receiverAccount = accounts.find((acc) => acc.userName === toAccount);
    receiverAccount.movements.push(amount);
    // console.log(receiverAccount.movements);

    // Hiển thị dữ liệu
    updateUI(currentAccount);
  } else {
    console.log("Transfer failed");
  }
});

/* ------------------------------------------------------------------------- */

// Xử lý xóa tài khoản
btnClose.addEventListener("click", function (e) {
  // Ngăn chặn tải lại trang
  e.preventDefault();

  // Lấy username và pin từ input
  const inputUsername = inputCloseUsername.value;
  const inputPin = inputClosePin.value;
  // console.log(inputUsername, inputPin);

  // Xong rồi xóa input
  inputCloseUsername.value = "";
  inputCloseUsername.blur();
  inputClosePin.value = "";
  inputClosePin.blur();

  // Kiểm tra username và pin có hợp lệ không?
  if (
    inputUsername === currentAccount.userName &&
    Number(inputPin) === currentAccount.pin
  ) {
    console.log("Account closed");

    // Xóa tài khoản khỏi mảng
    accounts.splice(
      accounts.findIndex((acc) => acc.userName === inputUsername),
      1
    );
    // console.log(accounts);

    // Xóa tài khoản đang đăng nhập
    currentAccount = undefined;

    // Ẩn app
    containerApp.style.opacity = "0";

    // Hiển thị lời chào mừng
    labelWelcome.textContent = "Log in to get started";
  } else {
    console.log("Account not found");
  }
});

/* ------------------------------------------------------------------------- */

// Xử lý cho vay
btnLoan.addEventListener("click", function (e) {
  // Ngăn chặn tải lại trang
  e.preventDefault();

  // Lấy số tiền muốn vay
  const amount = Number(inputLoanAmount.value);
  // console.log(amount);

  // Xong rồi xóa input
  inputLoanAmount.value = "";
  inputLoanAmount.blur();

  // Kiểm tra số tiền có hợp lệ không?
  if (
    amount > 0 && // Số tiền phải lớn hơn 0
    currentAccount.movements.some((mov) => mov > amount * 0.1) // Phải có khoản tiền gửi lớn hơn 10% số tiền vay
  ) {
    console.log("Loan successful");

    // Thêm dòng tiền dương vào tài khoản hiện tại
    currentAccount.movements.push(amount);
    // console.log(currentAccount.movements);

    // Hiển thị dữ liệu
    updateUI(currentAccount);
  } else {
    console.log("Loan failed");
  }
});

/* ------------------------------------------------------------------------- */

// Icon nút ⬇️ : danh sách dòng tiền tăng dần từ trên xuống (Top=Min; Bottom=Max) ... MẶC ĐỊNH
// Icon nút ⬆️ : danh sách dòng tiền giảm dần từ trên xuống (Top=Max; Bottom=Min)
let sortIcon = true; // MẶC ĐỊNH

// Vì danh sách dòng tiền được hiển thị theo insertAdjacentHTML("afterbegin")
// Phần tử đầu tiên của mảng ([0]) nằm dưới cùng (Bottom)
// Cho nên theo MẶC ĐỊNH, danh sách dòng tiền phải được sắp xếp GIẢM DẦN

// Xử lý sắp xếp dòng tiền
btnSort.addEventListener("click", function () {
  // Thay đổi trạng thái
  sortIcon = !sortIcon;

  // Thay đổi icon
  if (sortIcon) {
    btnSort.innerHTML = "&downarrow; SORT"; // ⬇️
  } else {
    btnSort.innerHTML = "&uparrow; SORT"; // ⬆️
  }

  // Hiển thị dữ liệu
  displayMovements(currentAccount.movements, sortIcon);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// 1. Tính tổng số tiền gửi vào ngân hàng
console.log("Sum of all deposits: ");

// CÁCH 1:
const bankDepositSum1 = Array.from(accounts, (acc) =>
  acc.movements.filter((mov) => mov > 0).reduce((acc, curr) => acc + curr, 0)
).reduce((acc, curr) => acc + curr, 0);
console.log(bankDepositSum1);

// CÁCH 2:
const bankDepositSum2 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, curr) => acc + curr, 0);
console.log(bankDepositSum2);

// 2. Có bao nhiêu khoản tiền gửi ít nhất trên 1000€?
console.log("Number of deposits over 1000€: ");

// CÁCH 1:
const numberDeposits1000_1 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov >= 1000).length;
console.log(numberDeposits1000_1);

// CÁCH 2:
const numberDeposits1000_2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, mov) => (mov >= 1000 ? ++count : count), 0);
console.log(numberDeposits1000_2);
// Chú ý dấu (++)
// ++count ✅ : tăng count lên 1 rồi mới trả về giá trị count
// count++ ❌ : trả về giá trị count hiện tại trước khi tăng count lên 1 -> kết quả luôn là 0

// 3. Tính tổng số tiền gửi và rút ra
console.log("Summary of all deposits and withdrawals: ");

// CÁCH 1:
const summaryBank1 = Object.groupBy(
  accounts.flatMap((acc) => acc.movements),
  (mov) => (mov > 0 ? "deposit" : "withdrawal")
);
summaryBank1["sumDeposit"] = summaryBank1["deposit"].reduce(
  (acc, curr) => acc + curr,
  0
);
summaryBank1["sumWithdrawal"] = summaryBank1["withdrawal"].reduce(
  (acc, curr) => acc + curr,
  0
);
console.log(summaryBank1);

// CÁCH 2:
const summaryBank2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sum, mov) => {
      sum[mov > 0 ? "deposit" : "withdrawal"] += mov;
      return sum;
    },
    { deposit: 0, withdrawal: 0 }
  );
console.log(summaryBank2);

// 4. Viết một hàm nhận bất kỳ chuỗi và chuyển thành tiêu đề
// Ví dụ: "this is a nice title" -> "This Is a Nice Title"
console.log("Convert string to title case: ");

const convertTitleCase = function (title) {
  // Step 1: Cắt tỉa phần đầu và đuôi của chuỗi (nếu có)
  // Step 2: Chuyển chuỗi thành chữ thường
  // Step 3: Tách chuỗi thành các từ (mảng)
  // Step 4: Kiểm tra từng từ có phải là từ đặc biệt không?
  // Nếu không phải từ đặc biệt thì chuyển đổi từ đầu tiên của từ đó thành chữ hoa
  // Nếu là từ đặc biệt thì giữ nguyên từ đó
  // Step 5: Nối các từ lại với nhau thành chuỗi mới
  title = title
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (
        index === 0 || // Bỏ qua từ đầu tiên
        (word !== "a" &&
          word !== "an" &&
          word !== "and" &&
          word !== "the" &&
          word !== "but" &&
          word !== "or" &&
          word !== "on" &&
          word !== "in" &&
          word !== "with")
      ) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
  return title;
};

console.log(convertTitleCase("this is a nice title!"));
console.log(convertTitleCase("how are you doing today?"));
console.log(convertTitleCase("TOM and JERRY"));
console.log(convertTitleCase("true OR false"));
console.log(convertTitleCase("go ON a walk"));
console.log(convertTitleCase("go with the flow"));
console.log(convertTitleCase("a hOuSe"));
console.log(convertTitleCase("an ApPlE"));
console.log(convertTitleCase("the market"));
