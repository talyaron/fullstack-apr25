// main controller
async function main() {
  try {
    showLoading();
    const tasks = await getAllTasks();

    hideLoading();

    if (tasks.length > 0) {
      renderTasksList(tasks);
    } else {
      renderEmptyState();
    }
  } catch (error) {
    console.error("Error occurred while fetching tasks:", error);
    hideLoading();
    renderError("שגיאה בטעינת המשימות");
  }
}

// פונקציה לכפתור הרענון
function loadTasks() {
  main();
}

main();

// פונקציות עזר להצגה/הסתרה
function showLoading() {
  const loadingElement = document.getElementById("loading");
  const errorElement = document.getElementById("error");
  const taskCountElement = document.getElementById("task-count");
  const tasksContainer = document.getElementById("tasks-container");

  if (loadingElement) loadingElement.style.display = "block";
  if (errorElement) errorElement.style.display = "none";
  if (taskCountElement) taskCountElement.style.display = "none";
  if (tasksContainer) tasksContainer.innerHTML = "";
}

function hideLoading() {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) loadingElement.style.display = "none";
}

//services
interface Task {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

interface TasksResponse {
  success: boolean;
  data?: Task[];
  count?: number;
  message?: string;
}

async function getAllTasks(): Promise<Task[]> {
  try {
    const response = await fetch("http://localhost:3000/tasks/get-all-tasks");

    const data: TasksResponse = (await response.json()) as TasksResponse;

    if (response.ok) {
      if (data.success && data.data) {
        return data.data;
      } else {
        throw new Error("No tasks found");
      }
    } else {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error occurred while fetching tasks:", error);
    return [];
  }
}

async function getTaskById(taskId: any): Promise<Task | null> {
  try {
    const response = await fetch(
      `http://localhost:3000/tasks/get-task/${taskId}`
    );
    const data = await response.json();

    if (response.ok && data.success) {
      return data.data;
    } else {
      throw new Error(data.message || "Task not found");
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
}

// Add task form logic - create task ()
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-task-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titleInput = document.getElementById(
      "task-title"
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      "task-description"
    ) as HTMLTextAreaElement;
    const messageDiv = document.getElementById(
      "form-message"
    ) as HTMLDivElement;

    if (!titleInput || !descriptionInput || !messageDiv) return;

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title) {
      messageDiv.textContent = "כותרת המשימה חובה";
      messageDiv.style.color = "#b91c1c";
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/tasks/create-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (res.ok) {
        messageDiv.textContent = "משימה נוספה בהצלחה!";
        messageDiv.style.color = "#256029";
        titleInput.value = "";
        descriptionInput.value = "";
        main(); // רענון רשימה
      } else {
        const error = data.message || "שגיאה בהוספת המשימה";
        messageDiv.textContent = error;
        messageDiv.style.color = "#b91c1c";
      }
    } catch (err) {
      messageDiv.textContent = "שגיאת רשת/שרת";
      messageDiv.style.color = "#b91c1c";
    }
  });
});

async function handleDeleteTask(taskId: any): Promise<void> {
  if (!confirm("בטוח שרוצה למחוק את המשימה?")) {
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/tasks/delete-task/${taskId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (res.ok) {
      console.log("Task deleted successfully");
      main(); // רענן את הרשימה
    } else {
      console.error("Failed to delete task:", data.message);
    }
  } catch (error) {
    console.error("Error occurred while deleting task:", error);
  }
}

// Quick button function - toggle task status
async function toggleTaskComplete(taskId: any, completed: any) {
  try {
    const res = await fetch(
      `http://localhost:3000/tasks/update-task/${taskId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      console.log("Task status updated successfully");
      main(); // refresh the task list
    } else {
      console.error("Failed to update task status:", data.message);
    }
  } catch (error) {
    console.error("Error occurred while updating task status:", error);
  }
}

// Function to open edit modal
function openEditModal(taskId: any) {
  getAllTasks().then((tasks) => {
    const currentTask = tasks.find((t) => t.id === taskId);
    if (!currentTask) return;

    // create modal element
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
     <div class="modal-content">
       <h3>ערוך משימה</h3>
       <form id="edit-task-form">
         <input type="text" id="edit-title" value="${
           currentTask.title
         }" required>
         <textarea id="edit-description" placeholder="Description">${
           currentTask.description || ""
         }</textarea>
         <label>
           <input type="checkbox" id="edit-completed" ${
             currentTask.completed ? "checked" : ""
           }>
           משימה הושלמה?
         </label>
         <div class="modal-buttons">
           <button type="submit">שמור</button>
           <button type="button" onclick="closeModal()">בטל</button>
         </div>
       </form>
     </div>
   `;

    document.body.appendChild(modal);

    // add event listener to form
    const form = modal.querySelector(
      "#edit-task-form"
    ) as HTMLFormElement | null;
    if (form) {
      form.addEventListener("submit", (e) => handleEditTask(e, taskId));
    }
  });
}

// Function to handle edit task submission
async function handleEditTask(e: any, taskId: any) {
  e.preventDefault();

  const titleInput = document.getElementById("edit-title") as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "edit-description"
  ) as HTMLTextAreaElement;
  const completedInput = document.getElementById(
    "edit-completed"
  ) as HTMLInputElement;

  if (!titleInput || !descriptionInput || !completedInput) {
    alert("Form elements not found");
    return;
  }

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const completed = completedInput.checked;

  if (!title) {
    alert("Task title is required");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/tasks/update-task/${taskId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, completed }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      console.log("Task updated successfully");
      closeModal();
      main(); // refresh task list
    } else {
      alert(data.message || "Error updating task");
    }
  } catch (error) {
    console.error("Error occurred while updating task:", error);
    alert("Network/server error");
  }
}

// Function to close modal
function closeModal() {
  const modal = document.querySelector(".modal-overlay");
  if (modal) {
    modal.remove();
  }
}

//view
function renderTasksList(tasks: Task[]) {
  const tasksContainer = document.getElementById("tasks-container");
  if (!tasksContainer) throw new Error("Tasks container not found");

  // Update task count
  const countElement = document.getElementById("task-count");
  if (countElement) {
    countElement.textContent = `נמצאו ${tasks.length} משימות`;
    countElement.style.display = "block";
  }

  // Clear existing content
  tasksContainer.innerHTML = "";

  // Render each task
  const tasksHTML = tasks
    .map((task) => {
      return createTaskCardHTML(task);
    })
    .join("");

  tasksContainer.innerHTML = tasksHTML;
}

function createTaskCardHTML(task: Task): string {
  const statusClass = task.completed ? 'completed' : 'pending';
  const statusText = task.completed ? 'הושלמה ✅' : 'ממתינה ⏳';
  const createdDate = new Date(task.createdAt).toLocaleDateString('he-IL');
  
  return `
    <div class="task-card" data-task-id="${task.id}">
      <div class="task-header">
        <h3 class="task-title">${task.title}</h3>
        <div class="task-buttons">
          <button class="edit-btn" onclick="openEditModal('${task.id}')">✏️</button>
          <button class="toggle-btn" onclick="toggleTaskComplete('${task.id}', ${!task.completed})">
            ${task.completed ? '↩️' : '✅'}
          </button>
          <button class="delete-btn" onclick="handleDeleteTask('${task.id}')">🗑️</button>
        </div>
      </div>
      ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
      <div class="task-status ${statusClass}">${statusText}</div>
      <div class="task-date">נוצרה ב: ${createdDate}</div>
    </div>
  `;
}

function renderEmptyState() {
  const tasksContainer = document.getElementById("tasks-container");
  const countElement = document.getElementById("task-count");

  if (countElement) {
    countElement.textContent = "נמצאו 0 משימות";
    countElement.style.display = "block";
  }

  if (tasksContainer) {
    tasksContainer.innerHTML = `
      <div class="empty-state">
        <h3>אין משימות עדיין</h3>
        <p>התחל ליצור את המשימה הראשונה שלך!</p>
      </div>
    `;
  }
}

function renderError(message: string) {
  const errorElement = document.getElementById("error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}
