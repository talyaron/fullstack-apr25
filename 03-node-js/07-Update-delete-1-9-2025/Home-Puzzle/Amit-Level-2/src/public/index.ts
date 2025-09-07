////////////////////////
//////// MODEL /////////
////////////////////////



type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
};

let tasksCache: Task[] = [];
let currentEditingId: string | null = null;

async function getAllTasks(): Promise<Task[]> {
  try {
    const res = await fetch("http://localhost:3000/tasks/all-tasks", {
      headers: { "x-api-key": "SECRET" },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.tasks ?? [];
  } catch {
    return [];
  }
}


////////////////////////
///////// VIEW /////////
////////////////////////

function renderTasksList(tasks: Task[]) {
  const taskContainer = document.getElementById("task-list");
  if (!taskContainer) return;

  taskContainer.innerHTML = "";

  tasks.forEach((task) => {
    const card = createTaskCard(task);
    taskContainer.appendChild(card);
  });
}


function replaceCard(taskId: string, nextel: HTMLElement) {
  const element = document.getElementById(`task-${taskId}`);
  if (element) element.replaceWith(nextel);
}

function createTaskCard(task: Task) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.id = `task-${task.id}`;

  card.innerHTML = `
  <div class="task-card__content">
    <h3 class="task-card__title">${task.title}</h3>
      <p class="task-card__description">${task.description}</p>
      <p class="task-card__priority">Priority: ${task.priority}</p>
      </div>
      <p class="task-card__status ${task.completed ? "task-card__status--completed" : "task-card__status--pending"}">
      ${task.completed ? "✅ Completed" : "⏳ Pending"}
      </p>
      <div class="task-card__actions">
      <button class="task-card__button task-card__button--update">Mark as ${task.completed ? "Pending" : "Completed"}</button>
      <button class="task-card__button task-card__button--edit">Edit</button>
      <button class="task-card__button task-card__button--delete">Delete</button>
      </div>
      `;

  card.querySelector(".task-card__button--update")?.addEventListener("click", () => toggleTaskStatus(task.id, !task.completed));
  card.querySelector(".task-card__button--edit")?.addEventListener("click", () => enableEdit(task));
  card.querySelector(".task-card__button--delete")?.addEventListener("click", () => deleteTask(task.id));

  return card;
}

function createTaskEditCard(task: Task) {
  const card = document.createElement("div");
  card.className = "task-card task-card--editing";
  card.id = `task-${task.id}`;

  card.innerHTML = `
      <div class="task-card__content">
      <input type="text" id="edit-title-${task.id}" class="task-card__input" value="${task.title}">
      <textarea id="edit-desc-${task.id}" class="task-card__textarea">${task.description}</textarea>
      <label for="edit-priority-${task.id}" class="task-card__label">Priority:</label>
      <select id="edit-priority-${task.id}" class="task-card__select">
      <option value="low" ${task.priority === "low" ? "selected" : ""}>Low</option>
      <option value="medium" ${task.priority === "medium" ? "selected" : ""}>Medium</option>
      <option value="high" ${task.priority === "high" ? "selected" : ""}>High</option>
      </select>
      </div>
      <div class="task-card__actions">
      <button class="task-card__button task-card__button--save">Save</button>
      <button class="task-card__button task-card__button--cancel">Cancel</button>
      </div>
      `;

  card.querySelector(".task-card__button--save")?.addEventListener("click", () => saveEdit(task.id));
  card.querySelector(".task-card__button--cancel")?.addEventListener("click", () => cancelEdit(task.id));

  return card;
}

function enableEdit(task: Task) {
  if (currentEditingId && currentEditingId !== task.id) {
    const prev = tasksCache.find(t => t.id === currentEditingId);
    if (prev) {
      replaceCard(currentEditingId, createTaskCard(prev));
    }
  }

  replaceCard(task.id, createTaskEditCard(task));
  currentEditingId = task.id;
}

/////////////////////////
////// CONTROLLER ///////
/////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  initForm();
  main();
});

function initForm() {
  const taskForm = document.getElementById("task-form") as HTMLFormElement | null;
  if (!taskForm) return;

  taskForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const titleInput = document.getElementById("task-title") as HTMLInputElement | null;
    const descriptionInput = document.getElementById("task-description") as HTMLTextAreaElement | null;
    const prioritySelect = document.getElementById("task-priority") as HTMLSelectElement | null;

    if (!titleInput || !descriptionInput || !prioritySelect) return;

    const newTask: Task = {
      id: "",
      title: titleInput.value,
      description: descriptionInput.value,
      completed: false,
      priority: prioritySelect.value as "low" | "medium" | "high",
      createdAt: new Date(),
    };

    addTask(newTask);
    taskForm.reset();
  });
}

async function addTask(task: Task) {
  const res = await fetch("http://localhost:3000/tasks/add-task", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": "SECRET" },
    body: JSON.stringify(task),
  });
  if (!res.ok) return;
  const {task: created} = await res.json();
  const container = document.getElementById("task-list");
  if (container) container.prepend(createTaskCard(created));

}

async function toggleTaskStatus(id: string, newStatus: boolean) {
  const res = await fetch(`http://localhost:3000/tasks/toggle-status/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-api-key": "SECRET" },
    body: JSON.stringify({ completed: newStatus }),
  });
  if (!res.ok) return;
  const { updatedTask } = await res.json();

  const idx = tasksCache.findIndex(t => t.id === id);
  if (idx !== -1) tasksCache[idx] = updatedTask;

  if (currentEditingId === id) currentEditingId = null;

  replaceCard(id, createTaskCard(updatedTask));
}

async function saveEdit(id: string) {
  const prev = tasksCache.find(t => t.id === id);
  if (!prev) return;

  const title = (document.getElementById(`edit-title-${id}`) as HTMLInputElement).value;
  const description = (document.getElementById(`edit-desc-${id}`) as HTMLTextAreaElement).value;
  const priority = (document.getElementById(`edit-priority-${id}`) as HTMLSelectElement).value as "low" | "medium" | "high";

  const body = { title, description, priority, completed: false };

  const res = await fetch(`http://localhost:3000/tasks/update-task/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-api-key": "SECRET" },
    body: JSON.stringify(body),
  });

  if (!res.ok) return;
  const { updatedTask } = await res.json();

  tasksCache = tasksCache.map(t => t.id === id ? updatedTask : t);

  const editEl = document.getElementById(`task-${id}`);
  if (!editEl) return;

  editEl.classList.add("task-card--closing");

  editEl.addEventListener("animationend", () => {
    editEl.replaceWith(createTaskCard(updatedTask));
    currentEditingId = null;
  }, { once: true });
}



function cancelEdit(id: string) {
  const editEl = document.getElementById(`task-${id}`);
  const original = tasksCache.find(t => t.id === id);
  if (!editEl || !original) return;

  editEl.classList.add("task-card--closing");

  editEl.addEventListener("animationend", () => {
    editEl.replaceWith(createTaskCard(original));
    if (currentEditingId === id) currentEditingId = null;
  }, { once: true });
}


async function deleteTask(id: string) {
  const res = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
    headers: { "x-api-key": "SECRET" },
  });
  if (!res.ok) return;

  tasksCache = tasksCache.filter(t => t.id !== id);
  const el = document.getElementById(`task-${id}`);
  if (el) {
    el?.classList.add("fade-out");
    el?.addEventListener("animationend", () => el.remove(), { once: true });
  }
}

async function main() {
  tasksCache = await getAllTasks();
  renderTasksList(tasksCache);
}