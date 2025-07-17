"use strict";

///////////////////////////////////////

//--- Xử lý đóng/mở Modal

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// Xử lý mở Modal và hiện lớp phủ nền mờ
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// Xử lý đóng Modal và ẩn lớp phủ nền
const closeModal = function (e) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Thêm event listener cho các nút đóng/mở Modal
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);

// Thêm event listener cho lớp phủ nền --> click trên lớp phủ nen62 sẽ đóng Modal
overlay.addEventListener("click", closeModal);

// Thêm event listener cho phím Escape --> nhấn phím Escape sẽ đóng Modal
document.addEventListener("keydown", function (e) {
  // console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/* ------------------------------------------------------------------------- */

//--- Nút cuộn xuống nội dung Section 1

const btnScrollTo = document.querySelector(".btn--scroll-to");

btnScrollTo.addEventListener("click", function (_) {
  const section1 = document.querySelector("#section--1");

  // Cách 1:
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // Cách 2:
  section1.scrollIntoView({ behavior: "smooth" });
});

/* ------------------------------------------------------------------------- */

//--- Cuộn xuống nội dung Section tương ứng với Link được click trên Nav

// CÁCH 1:
// Hành vi cuộn tự động của LINK không có hiệu ứng SMOOTH
// Nên đây là cách để thêm hiệu ứng cuộn trơn tru vào
// Tuy nhiên cách này tạo thêm nhiều HANDLE EVENT
// Với số lượng lớn nút nhấn sẽ không hiệu quả về hiệu suất

// document.querySelectorAll(".nav__link").forEach((link) => {
//   link.addEventListener("click", function (e) {
//     // Ngăn chặn hành vi mặc định của link (tự động cuộn xuống)
//     e.preventDefault();

//     // Tận dụng thiết lập cho "id của section" khớp với "href của link"
//     const id = link.getAttribute("href");
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// CÁCH 2:
// Một cách khác là dùng EVENT DELEGATION
// Tạo một event listener cho container cha
// Và xử lý event cho các element con

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/* ------------------------------------------------------------------------- */

// --- Hiển thị nội dung tương ứng với tab chọn ở Section 2

const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const contents = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // Bỏ qua nếu không phải là nút tab
  if (!clicked) return;

  // Xóa class active cho tất cả nút tab
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  // Thêm class active cho nút tab được click
  clicked.classList.add("operations__tab--active");

  // Xóa class active cho tất cả nội dung
  contents.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  // Thêm class active cho nội dung tương ứng với nút tab được click
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`) // Attribute Data
    .classList.add("operations__content--active");
});

/* ------------------------------------------------------------------------- */

// --- Tạo hiệu ứng mờ xung quanh nút được chọn trên thanh Navbar

const nav = document.querySelector(".nav");
const links = nav.querySelectorAll(".nav__link");
const logo = nav.querySelector(".nav__logo");

function handleHover(e, opacity, isOver) {
  if (e.target.classList.contains("nav__link")) {
    links.forEach((link) => (link.style.opacity = opacity));
    logo.style.opacity = opacity;
    isOver && (e.target.style.opacity = 1);
  }
}

nav.addEventListener("mouseover", (e) => handleHover(e, 0.5, true));
nav.addEventListener("mouseout", (e) => handleHover(e, 1, false));

/* ------------------------------------------------------------------------- */

//--- Sticky thanh Navbar khi cuộn xuống qua Section 1

// CÁCH 1:
// Lấy tọa độ của Section 1 khi trang web được load
// Lưu ý đây là tọa độ tương đối của Section 1 so với cửa sổ trình duyệt
// const initialCoordsSection1 = document
//   .querySelector("#section--1")
//   .getBoundingClientRect();

// document.addEventListener("scroll", function () {
//   if (window.scrollY > initialCoordsSection1.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//--- Sticky thanh Navbar khi cuộn qua Header

// CÁCH 2:
// Dùng Intersection Observer

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

// Kích hoạt Sticky thanh Navbar hoặc ngược lại
const obsCallback = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  // Sticky khi Header nằm ngoài Viewport (chúng không giao nhau)
  if (!entry.isIntersecting) nav.classList.add("sticky");
  // Ngược lại xóa Sticky, tức Header xuất hiện trong Viewport (chúng giao nhau)
  else nav.classList.remove("sticky");
};

// Thiếp lập cách quan sát
const obsOptions = {
  // Người quan sát là cửa sổ trình duyệt (Viewport)
  root: null,
  // 0%
  // - Kích hoạt khi toàn bộ Header nằm ngoài Viewport, tức <= 0%
  // - Và cũng kích hoạt khi Header xuất hiện trong Viewport, tức >= 0%
  threshold: 0,
  // Thêm khoảng đệm (px) quanh Viewport, bằng chiều cao thanh Navbar
  // - Giá trị âm --> Thu hẹp vùng quan sát vào trong Viewport
  // - Giúp kích hoạt sớm khi phần nội dung còn lại của Header đang hiển thị trong Viewport bằng chiều cao thanh Nav
  rootMargin: `-${navHeight}px`,
};

// Tạo người quan sát (Observer)
const observer = new IntersectionObserver(obsCallback, obsOptions);

// Mục tiêu quan sát là Header
observer.observe(header);

/* ------------------------------------------------------------------------- */

//--- Tiết lộ lần lượt từng phần nội dung (Section) khi cuộn xuống tới chúng

const allSection = document.querySelectorAll(".section");

// Kích hoạt hiện Section và bỏ theo dõi Section đã được hiện
const revealSection = function (entries, observer) {
  // console.log(entries);
  // Hàm này luôn được kích hoạt khi mới load trang
  // Và ta đang theo dõi nhiều Section, nên ta cần dùng forEach để kiểm tra tất cả Section đang theo dõi so với vị trí hiện tại của Viewport khi load trang
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    // Cho hiện Section đó khi nó giao nhau với Viewport
    entry.target.classList.remove("section--hidden");
    // Đồng thời bỏ theo dõi Section đó
    observer.unobserve(entry.target);
  });
};

// Tạo người quan sát (Observer)
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // Người quan sát là cửa sổ trình duyệt (Viewport)
  threshold: 0.15, // Kích hoạt khi Section chiếm 15% cửa sổ trình duyệt
});

// Mục tiêu quan sát là tất cả các Section
allSection.forEach((section) => {
  // Thêm Observer cho từng Section
  sectionObserver.observe(section);
  // Sẵn tiện cho ẩn tất cả Section khi mới load trang
  section.classList.add("section--hidden");
});

/* ------------------------------------------------------------------------- */

//--- Lazy loading Images

// Cơ bản, trong quá trình load web, các hình ảnh là thứ tốn tài nguyên nhất để load từ Sever xuống Client
// Để tạo trải nghiệm mượt cho người dùng, tức trang web cần được load nhanh những nội dung cần thiết nhất để có thứ hiển thị ngay lập cho người dùng. Còn lại trong quá trình người dùng scroll trang tới đâu phần đó sẽ được load thêm
// Vậy nên ban đầu web sẽ tải các Image có độ phân giải thấp nhấp và làm mờ để hiển thị tạm sẵn. Chỉ khi người dùng scroll gần tới Image đó, web sẽ load Image chất lượng cao về và hiển thị thay thế Image cũ

const images = document.querySelectorAll(".lazy-img");

const handleLazyLoadingImage = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const img = entry.target;

    // Tạo hàm xử lý sự kiện load một lần
    const handleLoad = function () {
      img.classList.remove("lazy-img");
      observer.unobserve(img);
      img.removeEventListener("load", handleLoad);
    };

    // Tạo hàm xử lý lỗi
    const handleError = function () {
      console.error(`Failed to load image: ${img.dataset.src}`);
      observer.unobserve(img);
      img.removeEventListener("error", handleError);
    };

    // Đổi link ảnh và thêm các event listener
    img.src = img.dataset.src;
    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);
  });
};

// Tạo người quan sát (Observer)
const imageObserver = new IntersectionObserver(handleLazyLoadingImage, {
  root: null, // Người quan sát là cửa sổ trình duyệt (Viewport)
  threshold: 0, // Kích hoạt khi Image bắt đầu xuất hiện trong Viewport

  // - Giá trị dương --> Mở rộng vùng quan sát ra ngoài Viewport
  // - Giúp kích hoạt sớm khi Viewport còn cách Image khoảng đệm
  rootMargin: "200px",
});

// Mục tiêu quan sát là tất cả các Image
images.forEach((img) => imageObserver.observe(img));

/* ------------------------------------------------------------------------- */

//--- Xử lý cuộn Slide

const slides = document.querySelectorAll(".slide");
const lengthSlides = slides.length;
let order = 0;

// Xử lý xếp từng Slide theo chiều ngang
const translateSlide = function () {
  // order =  0 :    0% ; 100% ;  200%
  // order = +1 : -100% ;   0% ;  100%
  // order = +2 : -200% ; -100% ;   0%
  slides.forEach((slide, position) => {
    slide.style.transform = `translateX(${position * 100 - order * 100}%)`;
  });
};
// Thực hiện xếp từng Slide theo chiều ngang khi mới load trang
translateSlide();

// Xử lý Order --> rồi xếp lại Slide theo Order
const handleOrder = function (dirSlide) {
  // dirSlide = true  -> SlideRight
  // dirSlide = false -> SlideLeft
  dirSlide
    ? (order = (order + 1) % lengthSlides)
    : (order = (order - 1 + lengthSlides) % lengthSlides);
  // console.log(order);

  handleDots(); // Cập nhập các Dot
  translateSlide(); // Cập nhập các Slide
};

const btnSlideLeft = document.querySelector(".slider__btn--left");
const btnSlideRight = document.querySelector(".slider__btn--right");

btnSlideRight.addEventListener("click", function (e) {
  // console.log("slide right");
  handleOrder(true);
});
btnSlideLeft.addEventListener("click", function (e) {
  // console.log("slide left");
  handleOrder(false);
});

document.addEventListener("keyup", function (e) {
  // console.log(e.key);
  if (e.key === "ArrowRight") {
    // console.log("slide right");
    handleOrder(true);
  }
  if (e.key === "ArrowLeft") {
    // console.log("slide left");
    handleOrder(false);
  }
});

/* ------------------------------------------------------------------------- */

//--- Xử lý Dot của Slide

const dotContainer = document.querySelector(".dots");

// Tạo số lượng Dot theo số lượng Slide khi load trang
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot ${
        i === order ? "dots__dot--active" : ""
      }" data-slide="${i}"></button>`
    );
  });
};
createDots();

// Thêm sự kiện cho các Dot
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    order = Number(e.target.dataset.slide); // Cập nhập Order
    // console.log(order);
    handleDots(); // Xử lý trạng thái các Dot
    translateSlide(); // Xử lý Slide theo Order
  }
});

// Xử lý trạng thái các Dot
const handleDots = function () {
  document.querySelectorAll(".dots__dot").forEach(
    (dot, i) =>
      i === order
        ? dot.classList.add("dots__dot--active") // Thêm class active cho Dot được click
        : dot.classList.remove("dots__dot--active") // Xóa class active cho các Dot còn lại
  );
};
