A1:

DOM Tree:
#document
└── html
    └── body
        └── div#app
            ├── header
            │   ├── h1
            │   │   └── "Todo App"
            │   └── nav
            │       ├── a.active
            │       │   └── "All"
            │       ├── a
            │       │   └── "Active"
            │       └── a
            │           └── "Completed"
            └── main
                ├── form#todoForm
                │   ├── input#todoInput
                │   └── button[type="submit"]
                │       └── "Add"
                └── ul#todoList
                    ├── li.todo-item
                    │   └── "Learn HTML"
                    └── li.todo-item.completed
                        └── "Learn CSS"

Các querySelectors:
document.querySelector("h1")
document.querySelector("#todoForm input")
document.querySelectorAll(".todo-item")
document.querySelector("nav a.active")
document.querySelector("#todoList li:first-child")
document.querySelectorAll("nav a")

A2:

Về XSS: nếu ta đưa dữ liệu người dùng vào innerHTML, trình duyệt sẽ hiểu đó là HTML thật. Kẻ tấn công có thể chèn script hoặc handler nguy hiểm như onerror.
Ví dụ:
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
Cách sửa:
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput; -> textContent sẽ hiển thị nguyên văn, không thực thi HTML hay script.

Nếu cần format riêng, hãy tạo element bằng createElement rồi gán textContent, thay vì nhét chuỗi HTML thẳng vào innerHTML.

A3:
A3 - Event Bubbling

Khi click vào button, thứ tự log là:
BUTTON
INNER
OUTER
Vì event bubble từ phần tử con lên cha: button → #inner → #outer.

Nếu bỏ comment e.stopPropagation(), output chỉ còn:
BUTTON
Vì stopPropagation() chặn event không cho tiếp tục lan lên các phần tử cha.

C1:
Các lỗi trong đoạn code:

addEventListener("onclick", ...) sai event name, phải là "click".
countDisplay = count; sai vì đang gán số vào biến DOM element, phải là countDisplay.textContent = count;.
historyList.innerHTML = null; không đúng, nên dùng historyList.innerHTML = ""; hoặc replaceChildren().
item.remove; không gọi hàm, phải là item.remove();.
count = localStorage.getItem("count"); trả về chuỗi, nên parse về số.
deleteHistory(this) là không cần thiết, có thể gọi trực tiếp this.remove() trong listener hoặc deleteHistory(this), nhưng hàm hiện tại nên dùng element.remove() cho gọn.
Phần load chỉ khôi phục count, chưa khôi phục history.
countDisplay.innerHTML = count; chạy được, nhưng không nên dùng innerHTML cho text đơn giản, nên dùng textContent.

C2:

Bind event lên 1000 element riêng lẻ là bad practice vì:
Tốn bộ nhớ cho rất nhiều listener.
Khó quản lý và bảo trì.
Nếu list thay đổi động thì phải bind lại cho từng phần tử mới.
Có thể làm chậm lúc khởi tạo giao diện.

Event Delegation giải quyết bằng cách:

Gắn một listener lên phần tử cha.
Khi con bị click, dùng event.target hoặc closest() để xác định phần tử thật sự được click.
Ít listener hơn, nhẹ hơn, dễ mở rộng hơn.

Nhanh hơn do:

Mỗi lần appendChild lên document.body có thể kích hoạt reflow/repaint.
DocumentFragment là vùng nhớ tạm trong DOM, không render từng lần.
Chỉ khi append fragment vào DOM thật thì trình duyệt mới cập nhật 1 lần, nên ít layout thrashing hơn.