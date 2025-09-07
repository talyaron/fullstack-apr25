
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
        const form = document.getElementById("addTaskForm");
        if (!form) throw new Error("addTaskForm form element not found.");
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
    } catch (error) {
        console.error('error in sbmiting new task: ', error);

    }
}

async function handleComplete(id: string, event: Event) {
    try {
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
//servers
async function getAllTasks(): Promise<Task[]> {
    try {
        const response = await fetch("http://localhost:2500/tasks/get-all-tasks");
        const data: TasksResponce = (await response.json()) as TasksResponce;
        if (!response.ok || data.error) throw new Error(data.error || "unknown error");
        return data.tasks;
    } catch (error) {
        console.error("error while fetching tasks from server");
        return [];
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
          <input type="checkbox" name="complete"  ${task.completed ? "checked" : ""}  onchange="handleComplete(${task.id}, event)">
        </label>
        <button class="task-card__delete" onclick = "handleDelete(${task.id})">Delete</button>
      </div>

      <div class="task-card__info">
        <div class="task-card__date"> started at: ${task.createdAt}</div>
        <h2 class="task-card__title">${task.title}</h2>
        <p class="task-card__description">${task.description}</p>
      </div>
    </div>
    `
}
try {

} catch (error) {
    console.error();

}
