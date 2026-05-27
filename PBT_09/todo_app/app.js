const STORAGE_KEY = "todo-app-v1";

const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const countText = document.querySelector("#countText");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

let todos = loadTodos();
let currentFilter = "all";
let editingId = null;

function loadTodos() {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return [];

    try {
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function makeId() {
    return Date.now() + Math.random();
}

function getVisibleTodos() {
    if (currentFilter === "active") {
        return todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
        return todos.filter(todo => todo.completed);
    }

    return todos;
}

function updateSummary() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    countText.textContent = `${activeCount} items left`;
    clearCompletedBtn.disabled = !todos.some(todo => todo.completed);
}

function updateFilterUI() {
    filterButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.filter === currentFilter);
    });
}

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = `todo-item${todo.completed ? " completed" : ""}`;
    li.dataset.id = String(todo.id);

    if (editingId === todo.id) {
        const editInput = document.createElement("input");
        editInput.className = "edit-input";
        editInput.type = "text";
        editInput.value = todo.text;
        editInput.dataset.editId = String(todo.id);
        li.appendChild(editInput);
        return li;
    }

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", `Delete ${todo.text}`);

    actions.appendChild(deleteBtn);
    li.append(text, actions);

    return li;
}

function render() {
    saveTodos();
    updateSummary();
    updateFilterUI();

    list.replaceChildren();

    const visibleTodos = getVisibleTodos();

    if (visibleTodos.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty-state";
        empty.textContent =
            currentFilter === "all"
                ? "No todos yet. Add one above."
                : "No todos match this filter.";
        list.appendChild(empty);
        return;
    }

    visibleTodos.forEach(todo => {
        list.appendChild(createTodoElement(todo));
    });

    if (editingId !== null) {
        requestAnimationFrame(() => {
            const editInput = list.querySelector(".edit-input");
            if (editInput) {
                editInput.focus();
                editInput.setSelectionRange(editInput.value.length, editInput.value.length);
            }
        });
    }
}

function startEditing(todoId) {
    editingId = todoId;
    render();
}

function saveEditing(inputElement) {
    const li = inputElement.closest(".todo-item");
    if (!li) return;

    const id = Number(li.dataset.id);
    const value = inputElement.value.trim();

    if (!value) {
        todos = todos.filter(todo => todo.id !== id);
    } else {
        const todo = todos.find(item => item.id === id);
        if (todo) todo.text = value;
    }

    editingId = null;
    render();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    todos.push({
        id: makeId(),
        text,
        completed: false
    });

    input.value = "";
    render();
    input.focus();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        render();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    if (editingId !== null && !todos.some(todo => todo.id === editingId)) {
        editingId = null;
    }
    render();
});

list.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
        const li = deleteBtn.closest(".todo-item");
        if (!li) return;

        const id = Number(li.dataset.id);
        todos = todos.filter(todo => todo.id !== id);

        if (editingId === id) {
            editingId = null;
        }

        render();
        return;
    }

    const text = e.target.closest(".todo-text");
    if (text) {
        const li = text.closest(".todo-item");
        if (!li) return;

        const id = Number(li.dataset.id);
        const todo = todos.find(item => item.id === id);
        if (!todo) return;

        if (editingId === id) return;

        todo.completed = !todo.completed;
        render();
    }
});

list.addEventListener("dblclick", (e) => {
    const text = e.target.closest(".todo-text");
    if (!text) return;

    const li = text.closest(".todo-item");
    if (!li) return;

    const id = Number(li.dataset.id);
    startEditing(id);
});

list.addEventListener("keydown", (e) => {
    const editInput = e.target.closest(".edit-input");
    if (!editInput) return;

    if (e.key === "Enter") {
        e.preventDefault();
        saveEditing(editInput);
    }

    if (e.key === "Escape") {
        editingId = null;
        render();
    }
});

list.addEventListener("focusout", (e) => {
    if (!e.target.matches(".edit-input")) return;
    if (!list.contains(e.target)) return;
    if (editingId === null) return;
    saveEditing(e.target);
});

render();