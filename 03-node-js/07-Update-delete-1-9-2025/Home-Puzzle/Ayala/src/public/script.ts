
//Data
interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
}

//Main controller
async function main() {
    try {
        await renderTasks(await getAllTasks())
        const form = document.getElementById("taskForm");
        if (!form) throw new Error("taskForm form element not found.");
        form.addEventListener("submit", await handleSubmit);
    } catch (error) {
        console.error("error in main controller: ", error);

    }
}
main()
//control functions
async function handleSubmit(event: SubmitEvent) {
    try {
        event.preventDefault();
        console.log("Form submited");
        if (!(event.target instanceof HTMLFormElement)) throw new Error("Event target is not a form");
        const formData = new FormData(event.target);
        const title = formData.get("title")
        const description = formData.get("description")
        const createdAt = new Date();
        const completed = false
        console.log(title, description, createdAt, completed);

        const response = await fetch("http://localhost:2500/tasks/add-task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, completed, createdAt }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error("error fetching add-task", (data.error));

        event.target.reset();
        main()
        handleHideForm()
    } catch (error) {
        console.error('error in sbmiting new task: ', error);

    }
}

//* not working for new tasks
async function handleComplete(id: string, event: Event) {
    try {
        console.log(id);


        if (!(event.target instanceof HTMLInputElement)) throw new Error("error in the checkbox input");
        const isComplete: boolean = event.target.checked
        const res = await fetch('http://localhost:2500/tasks/mark-complete', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, isComplete }) //data
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error('Failed to mark complete chekbox:', data.error);
        }
        main()
    } catch (error) {
        console.error('error in marking complete check box');
    }
}
function handleShowForm() {
    try {
        const form = document.getElementById("addTaskForm");
        if (!form) throw new Error("addTaskForm form element not found.");
        form.style.display = "flex"
    } catch (error) {
        console.error('error in showing add task form');

    }
}
function handleHideForm() {
    try {
        const form = document.getElementById("addTaskForm");
        if (!form) throw new Error("addTaskForm form element not found.");
        form.style.display = "none"
    } catch (error) {
        console.error('error in showing add task form');

    }
}
//error fetching the api: tasks/delete-task
async function handleDelete(id: string) {
    try {
        const res = await fetch('http://localhost:2500/tasks/delete-task', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }) //data
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error('Failed to delete task:', data.error);
        }
        main()
    } catch (error) {
        console.error('error in deleting task: ', error);
    }
}
//responce interfaces
interface TasksResponce {
    tasks: Task[];
    error?: string;

}
interface TaskResponce {
    task: Task;
    error?: string;
}
//servers
async function getAllTasks(): Promise<Task[]> {
    try {
        const response = await fetch("http://localhost:2500/tasks/get-all-tasks");
        const data: TasksResponce = (await response.json()) as TasksResponce;
        if (!response.ok || data.error) throw new Error(data.error || "unknown error");
        return data.tasks;
    } catch (error) {
        console.error("error while fetching tasks from server: ", error);
        return [];
    }
}

async function getTask(id: string): Promise<Task> {
    try {
        const response = await fetch(`http://localhost:2500/tasks/get-task/:${id}`);
        const data: TaskResponce = (await response.json()) as TaskResponce;
        if (!response.ok || data.error) throw new Error(data.error || "unknown error");
        return data.task;
    } catch (error) {
        console.error("error while fetching tasks from server: ", error);
        return { id: "1", title: "Buy groceries", completed: false, createdAt: new Date(), description: "Milk, eggs, bread" };
    }
}
//view functions

async function renderTasks(tasks: Task[]) {
    try {
        const tasksList = document.getElementById("tasksListRoot");
        if (!tasksList) throw new Error("tasksListRoot element not found");
        if (!tasks) throw new Error("no tasks");
        tasksList.innerHTML = tasks.map(task => taskHtml(task)).join("")
    } catch (error) {
        console.error('error in rendering tasks: ', error);
    }
}

function taskHtml(task: Task): string {
    // const formatedDate = task.createdAt.toLocaleDateString()
    return `
     <div class="task-card  ${task.completed ? " task-card-done" : ""}" >
      <div class="task-card__actions">
        <label class="task-card__complete">
          ${task.completed ? "Done</i>" : "Mark if done"}
          <input type="checkbox" name="complete"  ${task.completed ? "checked" : ""}  onchange="handleComplete('${task.id}', event)">
        </label>
        <button class="task-card__delete" onclick = "handleDelete('${task.id}')">Delete</button>
      </div>

      <div class="task-card__info">
        <div class="task-card__date"> started at: ${task.createdAt}</div>
        <h2 class="task-card__title">${task.title}</h2>
        <p class="task-card__description">${task.description ? task.description : ""}</p>
      </div>
    </div>
    `
}
// try {

// } catch (error) {
//     console.error();

// }
