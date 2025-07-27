//data
interface Task {
    name: string;
    priority: string;
    complete: boolean
}

const taskArray: Array<Task> = []

//view
function htmlTask(task: Task): string {
    return `
     <div class="taskCard">
        <div class="taskCard__name"> ${task.name}</div>
        <div class="taskCard__priority"> task priority: ${task.priority}</div>
        <div class="taskCard__complete"> the task is ${task.complete ? "complete" : "not complete yet"}</div>
    </div>
        `
}
function htmlError(object): string {
    return `
  * ${object} is required`

}


function renderTasks(allTasks: Array<Task>): void {
    try {
        const tasksinHtml = document.getElementById("tasksRoot");
        if (!tasksinHtml) throw new Error("tasksRoot not found");
        tasksinHtml.innerHTML = allTasks.map(task => htmlTask(task)).join("")

    } catch (error) {
        console.error("error rendering tasks: ", error);

    }
}
//control
function handleSubmit(event:Event) {
    try {

        event.preventDefault(); //*
        console.log('Form submitted');
        if (!(event.target instanceof HTMLFormElement)) {
            throw new Error('Event target is not a form');
        }
        const formData = new FormData(event.target);//*
        const data = Object.fromEntries(formData.entries());//*
        console.log('Form data:', data);//*

        const newTask: Task = {
            name: data.taskName as string,
            priority: data.priority as string,
            complete: (data.complete ? true : false)
        };
        if (isName(newTask) && isPriority(newTask)) {
            taskArray.push(newTask);
            renderTasks(taskArray);
            event.target.reset();
        }


    } catch (error) {
        console.error("error sumbiting: ", error);

    }


}

//model

function isName(task: Task): boolean {
    try {
        const nameInHtml = document.querySelector(".name_error")
        if (!nameInHtml) throw new Error("name_error elemeny not found");
        if (!task.name) {
            nameInHtml.innerHTML = htmlError("task name") as string
            console.error("task name required");
            return false
        }
        else {
            nameInHtml.innerHTML = ''
            return true
        }
    } catch (error) {
        console.error(error);
        return false
    }

}

function isPriority(task: Task): boolean {
    try {
        const priorityInHtml = document.querySelector(".priority_error")
        if (!priorityInHtml) throw new Error("priority_error elemeny not found");
        if (!task.priority) {
            priorityInHtml.innerHTML = htmlError("task priority") as string
            console.error("task priority required");
            return false
        }
        else {
            priorityInHtml.innerHTML = ''
            return true
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}



