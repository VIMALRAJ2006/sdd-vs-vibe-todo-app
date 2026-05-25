const STORAGE_TASKS = "todo-app:tasks";
const STORAGE_THEME = "todo-app:theme";
const STORAGE_FILTER = "todo-app:filter";

const CATEGORIES = {
  work: { label: "Work", class: "work" },
  personal: { label: "Personal", class: "personal" },
  shopping: { label: "Shopping", class: "shopping" },
  health: { label: "Health", class: "health" },
  other: { label: "Other", class: "other" },
};

const VALID_CATEGORIES = Object.keys(CATEGORIES);
const VALID_FILTERS = ["all", "active", "completed"];

const addForm = document.getElementById("add-form");
const taskInput = document.getElementById("task-input");
const taskCategory = document.getElementById("task-category");
const taskDue = document.getElementById("task-due");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const emptyStateText = document.getElementById("empty-state-text");
const taskCount = document.getElementById("task-count");
const themeToggle = document.getElementById("theme-toggle");
const filtersEl = document.getElementById("filters");
const filterButtons = filtersEl.querySelectorAll(".filters__btn");

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let tasks = loadTasks();
let filter = loadFilter();

function normalizeTask(raw) {
  const category = VALID_CATEGORIES.includes(raw.category) ? raw.category : "other";
  const dueDate =
    typeof raw.dueDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.dueDate)
      ? raw.dueDate
      : null;

  return {
    id: raw.id || generateId(),
    text: String(raw.text || "").trim(),
    completed: Boolean(raw.completed),
    category,
    dueDate,
  };
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_TASKS);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeTask).filter((t) => t.text);
  } catch {
    try {
      localStorage.removeItem(STORAGE_TASKS);
    } catch {
      /* ignore */
    }
    return [];
  }
}

function loadFilter() {
  try {
    const stored = localStorage.getItem(STORAGE_FILTER);
    return VALID_FILTERS.includes(stored) ? stored : "all";
  } catch {
    return "all";
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasks));
  } catch {
    console.warn("Could not save tasks to localStorage");
  }
}

function saveFilter(value) {
  try {
    localStorage.setItem(STORAGE_FILTER, value);
  } catch {
    console.warn("Could not save filter to localStorage");
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_THEME, theme);
  } catch {
    console.warn("Could not save theme to localStorage");
  }
}

function getTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  saveTheme(theme);
}

function generateId() {
  return crypto.randomUUID?.() ?? String(Date.now() + Math.random());
}

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  return task.dueDate < todayISO();
}

function formatDueDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return dateFormatter.format(new Date(y, m - 1, d));
}

function matchesFilter(task) {
  if (filter === "active") return !task.completed;
  if (filter === "completed") return task.completed;
  return true;
}

function getVisibleTasks() {
  return tasks.filter(matchesFilter);
}

function updateFilterUI() {
  filterButtons.forEach((btn) => {
    const active = btn.dataset.filter === filter;
    btn.setAttribute("aria-selected", String(active));
    btn.classList.toggle("filters__btn--active", active);
  });
}

function updateTaskCount() {
  const remaining = tasks.filter((t) => !t.completed).length;
  const visible = getVisibleTasks();
  const label = remaining === 1 ? "task" : "tasks";

  if (filter === "all") {
    taskCount.textContent = `${remaining} ${label} remaining`;
  } else if (filter === "active") {
    taskCount.textContent = `${visible.length} active ${visible.length === 1 ? "task" : "tasks"}`;
  } else {
    taskCount.textContent = `${visible.length} completed ${visible.length === 1 ? "task" : "tasks"}`;
  }
}

function getEmptyMessage() {
  if (tasks.length === 0) {
    return "No tasks yet. Add one above!";
  }
  if (filter === "active") return "No active tasks. You're all caught up!";
  if (filter === "completed") return "No completed tasks yet.";
  return "No tasks match this filter.";
}

function updateEmptyState() {
  const visible = getVisibleTasks();
  const show = visible.length === 0;
  emptyState.classList.toggle("empty-state--hidden", !show);
  emptyStateText.textContent = getEmptyMessage();
}

function setFilter(next) {
  if (!VALID_FILTERS.includes(next) || next === filter) return;
  filter = next;
  saveFilter(filter);
  updateFilterUI();

  if (!prefersReducedMotion.matches) {
    taskList.classList.add("task-list--transitioning");
    requestAnimationFrame(() => {
      renderList();
      requestAnimationFrame(() => {
        taskList.classList.remove("task-list--transitioning");
      });
    });
  } else {
    renderList();
  }

  updateTaskCount();
  updateEmptyState();
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className =
    "task-item" +
    (task.completed ? " task-item--completed" : "") +
    (prefersReducedMotion.matches ? "" : " task-item--enter");
  li.dataset.id = task.id;
  li.setAttribute("role", "listitem");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-item__checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute(
    "aria-label",
    `Mark "${task.text}" as ${task.completed ? "incomplete" : "complete"}`
  );

  const body = document.createElement("div");
  body.className = "task-item__body";

  const meta = document.createElement("div");
  meta.className = "task-item__meta";

  const cat = CATEGORIES[task.category] || CATEGORIES.other;
  const badge = document.createElement("span");
  badge.className = `task-item__category task-item__category--${cat.class}`;
  badge.textContent = cat.label;

  meta.appendChild(badge);

  if (task.dueDate) {
    const due = document.createElement("time");
    due.className = "task-item__due";
    due.dateTime = task.dueDate;
    due.textContent = formatDueDate(task.dueDate);
    if (isOverdue(task)) {
      due.classList.add("task-item__due--overdue");
      due.setAttribute("title", "Overdue");
    }
    meta.appendChild(due);
  }

  const span = document.createElement("span");
  span.className = "task-item__text";
  span.textContent = task.text;

  body.append(meta, span);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "task-item__delete";
  deleteBtn.setAttribute("aria-label", `Delete task: ${task.text}`);
  deleteBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  `;

  checkbox.addEventListener("change", () => toggleTask(task.id));
  deleteBtn.addEventListener("click", () => deleteTask(task.id, li));

  li.append(checkbox, body, deleteBtn);
  return li;
}

function renderList() {
  taskList.replaceChildren();
  getVisibleTasks().forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

function render() {
  renderList();
  updateTaskCount();
  updateEmptyState();
}

function addTask(text, category, dueDate) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.unshift({
    id: generateId(),
    text: trimmed,
    completed: false,
    category: VALID_CATEGORIES.includes(category) ? category : "other",
    dueDate: dueDate || null,
  });

  saveTasks();
  render();
}

function deleteTask(id, element) {
  if (element && !prefersReducedMotion.matches) {
    element.classList.add("task-item--leaving");
    element.addEventListener(
      "animationend",
      () => {
        tasks = tasks.filter((t) => t.id !== id);
        saveTasks();
        render();
      },
      { once: true }
    );
    return;
  }

  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.completed = !task.completed;
  saveTasks();
  render();
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(taskInput.value, taskCategory.value, taskDue.value || null);
  taskInput.value = "";
  taskDue.value = "";
  taskInput.focus();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

filtersEl.addEventListener("keydown", (e) => {
  const tabs = [...filterButtons];
  const index = tabs.findIndex((t) => t.dataset.filter === filter);
  if (index < 0) return;

  let next = index;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    next = (index + 1) % tabs.length;
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    next = (index - 1 + tabs.length) % tabs.length;
  } else {
    return;
  }

  setFilter(tabs[next].dataset.filter);
  tabs[next].focus();
});

themeToggle.addEventListener("click", () => {
  const next = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
});

setTheme(getTheme());
updateFilterUI();
render();
