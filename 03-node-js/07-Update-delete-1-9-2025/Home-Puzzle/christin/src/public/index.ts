// MODEL 

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  errors?: string[];
  tasks?: T[];
  task?: T;
  updatedTask?: T;
  deletedTask?: T;
};

// API Base URL
const API_BASE_URL = "http://localhost:3000";

// API Functions
async function getAllTasks(): Promise<Task[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/all-tasks`);
    
    if (!res.ok) {
      console.error("Failed to fetch tasks, status:", res.status);
      return [];
    }

    const data: ApiResponse<Task> = await res.json();
    
    if (!data.success || !data.tasks) {
      console.error("Response does not contain tasks:", data);
      return [];
    }

    return data.tasks.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt)
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

async function addTaskToServer(task: Omit<Task, 'id' | 'createdAt'>): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/add-task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    const data: ApiResponse<Task> = await res.json();

    if (!res.ok || !data.success) {
      const errorMessage = data.errors?.join(", ") || data.message || "Failed to add task";
      console.error("Failed to add task:", errorMessage);
      return false;
    }

    console.log("Added Task:", data.task);
    return true;
  } catch (error) {
    console.error("Error adding task:", error);
    return false;
  }
}

async function toggleTaskStatus(id: string, newStatus: boolean): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/toggle-status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: newStatus }),
    });

    const data: ApiResponse<Task> = await res.json();

    if (!res.ok || !data.success) {
      const errorMessage = data.message || "Failed to update task status";
      console.error("Failed to toggle task status:", errorMessage);
      return false;
    }

    console.log("Task status updated:", data.updatedTask);
    return true;
  } catch (error) {
    console.error("Error toggling task status:", error);
    return false;
  }
}

async function updateTaskOnServer(id: string, updatedTask: Omit<Task, 'id' | 'createdAt'>): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/update-task/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    const data: ApiResponse<Task> = await res.json();

    if (!res.ok || !data.success) {
      const errorMessage = data.errors?.join(", ") || data.message || "Failed to update task";
      console.error("Failed to update task:", errorMessage);
      return false;
    }

    console.log("Updated Task:", data.updatedTask);
    return true;
  } catch (error) {
    console.error("Error updating task:", error);
    return false;
  }
}

async function deleteTaskFromServer(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data: ApiResponse<Task> = await res.json();

    if (!res.ok || !data.success) {
      const errorMessage = data.message || "Failed to delete task";
      console.error("Failed to delete task:", errorMessage);
      return false;
    }

    console.log("Deleted Task:", data.deletedTask);
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
}

//CONTROLLER 

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

  taskForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const titleInput = document.getElementById("task-title") as HTMLInputElement | null;
    const descriptionInput = document.getElementById("task-description") as HTMLTextAreaElement | null;

    if (!titleInput || !descriptionInput) {
      console.error("One or more form inputs not found");
      return;
    }

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title) {
      alert("Please enter a task title");
      return;
    }

    const newTask = {
      title,
      description,
      completed: false,
    };

    const success = await addTaskToServer(newTask);
    if (success) {
      taskForm.reset();
      main();
    }
  });
}

async function addTask(task: Omit<Task, 'id' | 'createdAt'>) {
  const success = await addTaskToServer(task);
  if (success) {
    main();
  }
}

async function saveEdit(id: string) {
  const titleInput = document.getElementById(`edit-title-${id}`) as HTMLInputElement | null;
  const descInput = document.getElementById(`edit-desc-${id}`) as HTMLTextAreaElement | null;

  if (!titleInput || !descInput) {
    console.error("Edit form inputs not found");
    return;
  }

  const newTitle = titleInput.value.trim();
  const newDescription = descInput.value.trim();

  if (!newTitle) {
    alert("Please enter a task title");
    return;
  }

  const updatedTask = {
    title: newTitle,
    description: newDescription,
    completed: false,
  };

  const success = await updateTaskOnServer(id, updatedTask);
  if (success) {
    main();
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

function cancelEdit() {
  main();
}

async function deleteTask(id: string) {
  if (!confirm("Are you sure you want to delete this task?")) {
    return;
  }

  const success = await deleteTaskFromServer(id);
  if (success) {
    main();
  }
}

async function main() {
  const tasks = await getAllTasks();
  renderTasksList(tasks);
}

// VIEW 

function renderTasksList(tasks: Task[]) {
  const taskContainer = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");
  
  if (!taskContainer) {
    console.error("Task list container not found");
    return;
  }

  if (!tasks || tasks.length === 0) {
    taskContainer.innerHTML = `
      <div class="task-list__empty" id="empty-state">
        <p>No tasks yet. Create your first task above!</p>
      </div>
    `;
    return;
  }

  // Hide empty state if it exists
  if (emptyState) {
    emptyState.style.display = 'none';
  }

  taskContainer.innerHTML = tasks.map((task) => createTaskCard(task)).join("");
}

function createTaskCard(task: Task): string {
  const formattedDate = new Date(task.createdAt).toLocaleDateString();
  const escapedTitle = escapeHtml(task.title);
  const escapedDescription = escapeHtml(task.description || '');

  return `
    <div class="task-card" id="task-${task.id}">
      <div class="task-card__content">
        <h3 class="task-card__title">${escapedTitle}</h3>
        ${task.description ? `<p class="task-card__description">${escapedDescription}</p>` : ''}
        <small class="task-card__date">Created: ${formattedDate}</small>
      </div>
      <p class="task-card__status ${task.completed ? "task-card__status--completed" : "task-card__status--pending"}">
        ${task.completed ? "✅ Completed" : "⏳ Pending"}
      </p>
      <div class="task-card__actions">
        <button class="task-card__button task-card__button--update" onclick="toggleTaskStatus('${task.id}', ${!task.completed})">
          Mark as ${task.completed ? "Pending" : "Completed"}
        </button>
        <button class="task-card__button task-card__button--edit" onclick="enableEdit('${task.id}', '${escapedTitle}', '${escapedDescription}')">
          Edit
        </button>
        <button class="task-card__button task-card__button--delete" onclick="deleteTask('${task.id}')">
          Delete
        </button>
      </div>
    </div>
  `;
}

function createTaskEditCard(task: Task): string {
  const escapedTitle = escapeHtml(task.title);
  const escapedDescription = escapeHtml(task.description || '');

  return `
    <div class="task-card task-card--editing" id="task-${task.id}">
      <div class="task-card__content">
        <input type="text" id="edit-title-${task.id}" class="task-card__input" value="${escapedTitle}" placeholder="Task title..." maxlength="100">
        <textarea id="edit-desc-${task.id}" class="task-card__textarea" placeholder="Task description..." maxlength="500">${escapedDescription}</textarea>
      </div>
      <div class="task-card__actions">
        <button class="task-card__button task-card__button--save" onclick="saveEdit('${task.id}')">Save</button>
        <button class="task-card__button task-card__button--cancel" onclick="cancelEdit()">Cancel</button>
      </div>
    </div>
  `;
}

// Utility function to escape HTML
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}