type Priority = "none" | "low" | "medium" | "high";

interface Task {
  taskName: string;
  priority: Priority;
  completed: boolean;
}

const tasks: Task[] = [];

function handleSubmit(event: Event): void {
  try {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) {
      throw new Error("Event target is not a form");
    }

    const form = event.target;
    const formData = new FormData(form);

    const taskName = formData.get("fullName") as string;
    const priority = formData.get("priority") as Priority;

    const completedCheckbox = form.elements.namedItem(
      "checkbox"
    ) as HTMLInputElement;
    const completed = completedCheckbox.checked;
    const task: Task = {
      taskName,
      priority,
      completed,
    };

    if (!task.priority || !task.taskName) {
      throw new Error("All fields are needed");
    }
    if (task.priority === "none") {
      throw new Error("Priority is needed");
    }
    tasks.push(task);
    console.log(tasks);
    renderYourItems(tasks);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}

// View (HTML Generation & DOM Rendering)
function htmlYourItems(tasks: Task[]) {
  try {
    return tasks
      .map(
        (task) => `
        <div class="task-card">
          <div class="task-card__header">
            <h3 class="task-card__title">${task.taskName}</h3>
            <span class="task-card__priority task-card__priority--${
              task.priority
            }">
              ${task.priority.toUpperCase()}
            </span>
          </div>
          <div class="task-card__footer">
            <span class="task-card__completed">
              ${task.completed ? "Completed" : "Not Completed"}
            </span>
          </div>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error generating HTML:", error);
    return `<div class="error">Error rendering item</div>`;
  }
}

function renderYourItems(tasks: Task[]): void {
  try {
    const root = document.getElementById("taskDiv");
    if (!root) throw new Error("Root element not found");
    root.innerHTML = htmlYourItems(tasks);
  } catch (error) {
    console.error("Error rendering items:", error);
  }
}
function isCompleted() {}
