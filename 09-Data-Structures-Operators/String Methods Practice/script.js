"use strict";

// Nhập lệnh "node script.js" để chạy file này

///////////////////////////////////////
// String Methods Practice

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

/* ------------------------------------------------------------------------- */

// Phân tích chuỗi:
// Dấu (+) là dấu của dòng mới (\n)
// Dấu (;) là dấu tách giữa các phần nội dung của 1 dòng
// Mỗi dòng có 4 phần nội dung:
// - Phần 1: Tên loại chuyến bay (Delayed Departure, Arrival, Delayed Arrival, Departure)
// - Phần 2: Mã chuyến bay
// - Phần 3: Mã chuyến bay đích
// - Phần 4: Thời gian
// Dấu (_) là khoảng trắng (space) giữa các từ trong phần nội dung đầu tiên của 1 dòng
// Dấu (:) là dấu tách giữa giờ và phút

// Tách dòng
const rows = flights.split("+");
// console.log(rows);

for (const row of rows) {
  // Tách phần nội dung của 1 dòng thành 4 phần
  const [type, from, to, time] = row.split(";");
  // console.log(type, from, to, time);

  // Xử lý nội dung phần 1
  const text1 = type
    .replace(/_/g, " ")
    .trim()
    .replace("Delayed", "🔴 Delayed")
    .padStart(20);
  // console.log(text1);

  // Xử lý nội dung phần 2
  const text2 = `from ${from.slice(0, 3).toUpperCase()}`;
  // console.log(text2);

  // Xử lý nội dung phần 3
  const text3 = `to ${to.slice(0, 3).toUpperCase()}`;
  // console.log(text3);

  // Xử lý nội dung phần 4
  const text4 = `(${time.replace(":", "h")})`;
  // console.log(text4);

  console.log(`${text1} ${text2} ${text3} ${text4}`);
}
