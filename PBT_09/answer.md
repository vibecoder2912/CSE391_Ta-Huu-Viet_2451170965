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