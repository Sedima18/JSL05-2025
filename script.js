// DOM Elements
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal");
const modal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");

// Task columns
const columns = {
  todo: document.querySelector('[data-status="todo"] .tasks-container'),
  doing: document.querySelector('[data-status="doing"] .tasks-container'),
  done: document.querySelector('[data-status="done"] .tasks-container')
};

const STORAGE_KEY = "taskManagerTasks";

// Open modal
openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Form submit
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = taskForm.title.value.trim();
  const description = taskForm.description.value.trim();
  const status = taskForm.status.value;

  if (!title || !description) return;

  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    status
  };

  saveTask(newTask);
  renderTask(newTask);
  taskForm.reset();
  modal.classList.add("hidden");
});

// Save to localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  tasks.push(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Render task on board
function renderTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;

  const container = columns[task.status];
  if (container) container.appendChild(taskDiv);
}

document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  tasks.forEach(renderTask);
});
