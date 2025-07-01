# learn-javascript

> 🔗 [The Complete JavaScript Course 2025: From Zero to Expert!](https://www.udemy.com/course/the-complete-javascript-course/)

## Phần 2: JavaScript Fundamentals

> 📜 [Doc JavaScript Fundamental](https://jonas.io/assignments/instructions.html)

## Phần 7: JavaScript in the Browser: DOM and Events [PROJECT]

### DOM là gì?

> 📌 `DOM` viết tắt của `Document Object Model`
>
> - Nó là một biểu diễn có cấu trúc của các HTML Document.
> - Cho phép JavaScript truy cập các HTML Element và HTML Style (CSS) để thao tác với chúng.
>
> ✅ Về cơ bản, quy tắc là bất cứ thứ gì trong HTML Document cũng phải ở trong DOM.
>
> ✅ Có thể nói DOM là một bản trình bày hoàn chỉnh của HTML Document, để chúng ta có thể "thao tác" nó theo những cách phức tạp.

### Thao tác với DOM

> ✅ Các "phương thức" và "thuộc tính" của DOM (`DOM Methods and Properties`) thực sự là một phần của `WEB APIs`.
>
> ✅ Các `WEB APIs` giống như "thư viện" viết bằng JavaScript mà "trình duyệt" (`Brower`) mặc định có sẵn để triển khai.

#### Truy vấn bộ chọn

> `document.querySelector()`
>
> - name_html
> - `.`name_class
> - `#`name_id
>
> ⚠️ Tuy nhiên, nếu bạn chọn khớp với nhiều phần tử, cũng chỉ cái "đầu tiên" sẽ được chọn.
>
> ✅ Giải pháp là thêm `All` để chọn hết các phần tử khớp nhau. Trình duyệt sẽ lưu dưới dạng danh sách `NodeList`.
>
> `document.querySelectorAll()`

#### Đọc và Ghi nội dung

> `document.querySelector().textContent`

#### Đọc và Ghi giá trị

> `document.querySelector().value`

#### Đọc và Đổi kiểu

> `document.querySelector().style.`
>
> - Bạn cần cung cấp "loại kiểu" hợp lệ của phần tử được chọn. Các kiểu này đều có tên đặt theo quy tắc `CamelCase`.
>
> ⚠️ Bất cứ khi nào bạn "thao tác" với `style`, chúng ta luôn cần chỉ định "một chuỗi". Vì chuỗi có thể thể hiện được "nội dung" cũng như thể hiện được "giá trị kèm đơn vị".
>
> ✅ Đây là "kiểu nội tuyến" (`Inline Style`) - tức kiểu được áp dụng trực tiếp lên HTML bằng cách sử dụng "thuộc tính" `style`. Nên sẽ không làm thay đổi `file CSS` hay bất kỳ thứ gì tương tự.

#### Xử lý sự kiện

> ✅ Sự kiện (`Event`) là một cái gì đó "xảy ra" trên trang.
>
> ✅ Với Bộ lắng nghe sự kiện (`Event Listener`), chúng ta có thể đợi một sự kiện nhất định xảy ra và sau đó phản ứng với nó.
>
> `document.querySelector().addEventListener()`
>
> - Bạn cần cung cấp "loại sự kiện" cho Bộ lắng nghe sự kiện để nó theo dõi.
> - Để phản ứng với sự kiện, bạn cần xác định một `Hàm` thực thi bất cứ khi nào sự kiện đó xảy ra.
>
> ⚠️ Tuy DOM có thể lưu giữ giá trị chúng ta cần, bạn vẫn nên lưu riêng vào một biến (`const`, `let`, ...). Vì với các "biến trạng thái" (`State Variable`) ~ là một phần của "trạng thái ứng dụng" (`Application State`) - về cơ bản là tất cả data có liên quan đến ứng dụng. Chúng ta muốn tất cả data luôn có sẵn ở đâu đó trong code chứ ko chỉ ở trong DOM.
>
> ⚠️ Sự kiện từ "bàn phím" (`KeyBoard`) ~ có thể được xem là "sự kiện toàn cầu" (`Global Event`), bởi vì chúng không xảy ra trên một phần tử cụ thể thay vào đó là toàn bộ Document.
>
> `document.addEventListener()`

#### Đọc và Ghi danh sách Class

> `document.querySelector().classList.`
>
> - Dùng `add` để thêm 1 hay nhiều class mới vào danh sách hiện có.
> - Dùng `remove` để loại bỏ 1 hay nhiều class được chỉ định.
