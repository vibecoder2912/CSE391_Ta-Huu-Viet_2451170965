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