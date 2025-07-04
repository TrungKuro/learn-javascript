"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann", // js
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2021-01-28T09:15:04.904Z",
    "2025-06-26T10:17:24.185Z",
    "2025-06-28T17:01:17.194Z",
    "2025-06-30T14:11:59.604Z",
    "2025-07-01T22:36:17.929Z",
    "2025-07-03T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis", // jd
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2008-11-01T13:15:33.035Z",
    "2014-11-30T09:48:16.867Z",
    "2020-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2025-04-10T14:43:26.374Z",
    "2026-06-25T18:49:59.371Z",
    "2027-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/* ------------------------------------------------------------------------- */

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
const displayMovements = function (acc, sort) {
  // Xóa nội dung cũ (mẫu)
  containerMovements.innerHTML = "";

  // sortIcon = TRUE : sắp xếp giảm dần (descending) -> (B - A)
  // sortIcon = FALSE : sắp xếp tăng dần (ascending) -> (A - B)

  // Cập nhật nội dung mới
  // Giá trị dòng tiền được sắp xếp
  // Nhưng vẫn giữ số thứ tự giao dịch dòng tiền
  // Và không ảnh hưởng đến mảng gốc
  acc.movements
    .slice() // Tạo bản sao của mảng để không làm thay đổi mảng gốc
    .entries() // Tạo Iterator có các phần tử với dạng [index, value]
    .toArray() // Chuyển Iterator thành mảng 2 chiều
    .sort((a, b) => (sort ? b[1] - a[1] : a[1] - b[1])) // Sắp xếp theo giá trị dòng tiền
    .forEach(function (mov) {
      // Xác định loại giao dịch
      const type = mov[1] > 0 ? "deposit" : "withdrawal";

      // Tạo định dạng ngày tháng
      const formattedDate = formatDate(acc.movementsDates[mov[0]]);

      // Tạo định dạng số tiền
      const formattedValue = formatCurrency(mov[1], acc.currency);

      // Tạo HTML cho dòng tiền
      const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
        mov[0] + 1
      } ${type}</div>
      <div class="movements__date">${formattedDate}</div>
      <div class="movements__value">${formattedValue}</div>
    </div>
    `;
      containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

// TEST
// displayMovements(account1);

/* ------------------------------------------------------------------------- */

// Tính tổng số dư và hiển thị trên UI
const calcDisplayBalance = function (movements) {
  // Tính tổng số dư
  const balance = movements.reduce((acc, curr) => acc + curr, 0);

  // Cập nhật nội dung mới
  labelBalance.textContent = formatCurrency(balance, currentAccount.currency);
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
  labelSumIn.textContent = formatCurrency(income, currentAccount.currency);
  labelSumOut.textContent = formatCurrency(
    Math.abs(expense),
    currentAccount.currency
  );
  labelSumInterest.textContent = formatCurrency(
    interest,
    currentAccount.currency
  );
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

// Hiển thị dữ liệu
const updateUI = function (curAcc) {
  displayMovements(curAcc, sortIcon);
  calcDisplayBalance(curAcc.movements);
  calcDisplaySummary(curAcc.movements, curAcc.interestRate);
};

/* ------------------------------------------------------------------------- */

// Tạo định dạng ngày tháng, (mặc định là ngày hiện tại)
const formatDate = function (strDate) {
  // Tạo đối tượng Date hiện tại
  const now = new Date();
  // Tạo đối tượng Date từ chuỗi truyền vào
  const date = new Date(strDate);

  // Format các thành phần thời gian
  // const day = String((strDate ? date : now).getDate()).padStart(2, "0");
  // const month = String((strDate ? date : now).getMonth() + 1).padStart(2, "0");
  // const year = (strDate ? date : now).getFullYear();
  // const hour = String((strDate ? date : now).getHours()).padStart(2, "0");
  // const minute = String((strDate ? date : now).getMinutes()).padStart(2, "0");
  // const second = String((strDate ? date : now).getSeconds()).padStart(2, "0");

  // Mục đích là dùng cho hiển thị thời gian đăng nhập!
  // if (!strDate) return `${day}/${month}/${year}, ${hour}:${minute}`;
  if (!strDate) {
    startLogOutTimer();
    return new Intl.DateTimeFormat(currentAccount.locale, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(now);
  }

  // Reset thời gian về 00:00:00 để so sánh chỉ theo ngày
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // Tính số ngày chênh lệch
  const diffTime = startOfToday - startOfDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Format theo các trường hợp
  if (diffTime < 0) {
    // return `Future date: ${day}/${month}/${year}, ${hour}:${minute}:${second}`;
    return `Future date: ${new Intl.DateTimeFormat(currentAccount.locale, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date)}`;
  }
  if (diffDays === 0) {
    return "Today";
  }
  if (diffDays === 1) {
    return "Yesterday";
  }
  if (diffDays <= 7) {
    return `${diffDays} days ago`;
  }
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(currentAccount.locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
};

// Tạo định dạng số tiền
const formatCurrency = function (value, currency) {
  return new Intl.NumberFormat(currentAccount.locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

/* ------------------------------------------------------------------------- */

const startLogOutTimer = function () {
  // Thời gian đếm ngược (giây)
  let counter = 75;
  const min = String(Math.floor(counter / 60)).padStart(2, "0");
  const sec = String(counter % 60).padStart(2, "0");
  labelTimer.textContent = `${min}:${sec}`;

  // Hiển thị thời gian đếm ngược
  const timer = setInterval(function () {
    const min = String(Math.floor(counter / 60)).padStart(2, "0");
    const sec = String(counter % 60).padStart(2, "0");
    labelTimer.textContent = `${min}:${sec}`;
    if (counter-- === 0) {
      containerApp.style.opacity = "0";
      currentAccount = undefined;
      console.log("Log out");
      clearInterval(timer);
    }
  }, 1000);

  // Xóa thời gian đếm ngược sau 30 giây
  // setTimeout(function () {
  //   clearInterval(timer);
  // }, counter * 1000);
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

    // Lấy ngày hiện tại
    const formattedDate = formatDate();

    // Hiển thị lời chào mừng
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    // Hiển thị ngày hiện tại
    labelDate.textContent = formattedDate;

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
    setTimeout(function () {
      console.log("Transfer successful");

      // Lấy thời gian vừa giao dịch xong
      const now = new Date().toISOString();

      // Thêm dòng tiền âm vào tài khoản hiện tại
      currentAccount.movements.push(-amount);
      // console.log(currentAccount.movements);

      // Thêm dòng tiền dương vào tài khoản nhận
      const receiverAccount = accounts.find(
        (acc) => acc.userName === toAccount
      );
      receiverAccount.movements.push(amount);
      // console.log(receiverAccount.movements);

      // Thêm thời gian vừa giao dịch xong cho tài khoản hiện tại
      currentAccount.movementsDates.push(now);
      // console.log(currentAccount.movementsDates);

      // Thêm thời gian vừa giao dịch xong cho tài khoản nhận
      receiverAccount.movementsDates.push(now);
      // console.log(receiverAccount.movementsDates);

      // Hiển thị dữ liệu
      updateUI(currentAccount);
    }, 2000);
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
  const amount = Math.floor(Number(inputLoanAmount.value));
  // console.log(amount);

  // Xong rồi xóa input
  inputLoanAmount.value = "";
  inputLoanAmount.blur();

  // Kiểm tra số tiền có hợp lệ không?
  if (
    amount > 0 && // Số tiền phải lớn hơn 0
    currentAccount.movements.some((mov) => mov > amount * 0.1) // Phải có khoản tiền gửi lớn hơn 10% số tiền vay
  ) {
    setTimeout(function () {
      console.log("Loan successful");

      // Lấy thời gian vừa giao dịch xong
      const now = new Date().toISOString();

      // Thêm dòng tiền dương vào tài khoản hiện tại
      currentAccount.movements.push(amount);
      // console.log(currentAccount.movements);

      // Thêm thời gian vừa giao dịch xong
      currentAccount.movementsDates.push(now);
      // console.log(currentAccount.movementsDates);

      // Hiển thị dữ liệu
      updateUI(currentAccount);
    }, 2000);
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
  displayMovements(currentAccount, sortIcon);
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
