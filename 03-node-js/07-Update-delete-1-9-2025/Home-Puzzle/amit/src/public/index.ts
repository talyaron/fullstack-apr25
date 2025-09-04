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

    if (!titleInput || !descriptionInput) {
      console.error("One or more form inputs not found");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: titleInput.value,
      description: descriptionInput.value,
      completed: false,
      createdAt: new Date(),
    };
    addTask(newTask);

    console.log("New Task Created:", newTask);
  });
}

async function addTask(task: Task) {
  try {
    const res = await fetch("http://localhost:3000/tasks/add-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      console.error("Failed to add task, status:", res.status);
      return;
    }
    main();
    console.log("Task added successfully");
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

async function toggleTaskStatus(id: string, newStatus: boolean) {
  try {
    const res = await fetch(`http://localhost:3000/tasks/toggle-status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: newStatus }),
    });

    if (!res.ok) {
      console.error("Failed to toggle task status, status:", res.status);
      return;
    }

    const data = await res.json();
    console.log("Task status updated:", data.updatedTask);
    
    main();
  } catch (error) {
    console.error("Error toggling task status:", error);
  }
}

function enableEdit(id: string, title: string, description: string) {
  const taskContainer = document.getElementById(`task-${id}`);
  if (!taskContainer) return;

  taskContainer.outerHTML = createTaskEditCard({ 
    id, 
    title, 
    description, 
    completed: false, 
    createdAt: new Date() 
  });
}

async function saveEdit(id: string) {
  const newTitle = (document.getElementById(`edit-title-${id}`) as HTMLInputElement).value;
  const newDescription = (document.getElementById(`edit-desc-${id}`) as HTMLTextAreaElement).value;

  const updatedTask: Task = {
    id,
    title: newTitle,
    description: newDescription,
    completed: false,
    createdAt: new Date(),
  };

  try {
    const res = await fetch(`http://localhost:3000/tasks/update-task/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (!res.ok) {
      console.error("Failed to update task");
      return;
    }

    const data = await res.json();
    console.log("Updated Task:", data.updatedTask);

    main();
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

function cancelEdit() {
  main();
}


async function deleteTask(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      console.error("Failed to delete task, status:", res.status);
      return;
    }
    const data = await res.json();
    console.log(`${data.deletedTask.title} deleted successfully`);

    main();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

async function main() {
  const tasks = await getAllTasks();
  if (!tasks || tasks.length === 0) {
    renderTasksList([]);
    console.log("No tasks to render");
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
  return `
    <div class="task-card" id="task-${task.id}">
      <div class="task-card__content">
        <h3 class="task-card__title">${task.title}</h3>
        <p class="task-card__description">${task.description}</p>
      </div>
      <p class="task-card__status ${task.completed ? "task-card__status--completed" : "task-card__status--pending"}">
        ${task.completed ? "✅ Completed" : "⏳ Pending"}
      </p>
      <div class="task-card__actions">
        <button class="task-card__button task-card__button--update" onclick="toggleTaskStatus('${task.id}', ${!task.completed})">
          Mark as ${task.completed ? "Pending" : "Completed"}
        </button>
        <button class="task-card__button task-card__button--edit" onclick="enableEdit('${task.id}', '${task.title}', '${task.description}')">
          Edit
        </button>
        <button class="task-card__button task-card__button--delete" onclick="deleteTask('${task.id}')">
          Delete
        </button>
      </div>
    </div>
  `;
}

function createTaskEditCard(task: Task) {
  return `
    <div class="task-card task-card--editing" id="task-${task.id}">
      <div class="task-card__content">
        <input type="text" id="edit-title-${task.id}" class="task-card__input" value="${task.title}">
        <textarea id="edit-desc-${task.id}" class="task-card__textarea">${task.description}</textarea>
      </div>
      <div class="task-card__actions">
        <button class="task-card__button task-card__button--save" onclick="saveEdit('${task.id}')">Save</button>
        <button class="task-card__button task-card__button--cancel" onclick="cancelEdit('${task.id}')">Cancel</button>
      </div>
    </div>
  `;
}


