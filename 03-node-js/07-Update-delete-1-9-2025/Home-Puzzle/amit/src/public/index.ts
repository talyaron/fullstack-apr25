////////////////////////
//////// MODEL /////////
////////////////////////

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
};

async function getAllTasks(): Promise<Task[]> {
  try {
    const res = await fetch("http://localhost:3000/tasks/all-tasks");
    if (!res.ok) {
      console.error("Failed to fetch tasks, status:", res.status);
      return [];
    }

    const data = await res.json();
    if (!data || !data.tasks) {
      console.error("Response does not contain tasks:", data);
      return [];
    }

    return data.tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
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
  if (!taskForm) {
    console.error("Task form not found");
    return;
  }

  taskForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const titleInput = document.getElementById("task-title") as HTMLInputElement | null;
    const descriptionInput = document.getElementById("task-description") as HTMLTextAreaElement | null;
    const completedInput = document.getElementById("task-completed") as HTMLInputElement | null;

    if (!titleInput || !descriptionInput || !completedInput) {
      console.error("One or more form inputs not found");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: titleInput.value,
      description: descriptionInput.value,
      completed: completedInput.checked,
      createdAt: new Date(),
    };

    console.log("New Task Created:", newTask);
  });
}

async function main() {
  const tasks = await getAllTasks();
  if (!tasks || tasks.length === 0) {
    console.warn("No tasks to render");
    return;
  }

  renderTasksList(tasks);
}


////////////////////////
///////// VIEW /////////
////////////////////////

function renderTasksList(tasks: Task[]) {
  const taskContainer = document.getElementById("task-list");
  if (!taskContainer) {
    console.error("Task list container not found");
    return;
  }

  taskContainer.innerHTML = tasks.map((task) => createTaskCard(task)).join("");
}

function createTaskCard(task: Task) {
  if (!task || !task.id || !task.title) {
    console.error("Invalid task data:", task);
    return "";
  }

  return `
    <div class="task-card">
      <h3 class="task-card__title">${task.title}</h3>
      <p class="task-card__description">${task.description}</p>
      <p class="task-card__status ${
        task.completed ? "task-card__status--completed" : "task-card__status--pending"
      }">
        ${task.completed ? "✅ Completed" : "⏳ Pending"}
      </p>
      <div class="task-card__actions">
        <button class="task-card__button task-card__button--delete" onclick="deleteTask('${task.id}')">
          Delete
        </button>
      </div>
    </div>
  `;
}
