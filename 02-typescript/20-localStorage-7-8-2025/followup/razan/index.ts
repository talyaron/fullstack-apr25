const tasks: string[] = sessionStorage.getItem("tasks") ? JSON.parse(sessionStorage.getItem("tasks")!) : [];

function addTask(): boolean {
    const newTask = prompt("Enter a new task:");
    if (newTask) {
        tasks.push(newTask);
        console.log(`Task "${newTask}" added.`);
        console.log("Current tasks:", tasks);
        sessionStorage.setItem("tasks", JSON.stringify(tasks));
        return true;
    } else {
        console.log("No task entered. Stopping input.");
        return false;
    }
}

while (addTask()) {
    // Continues prompting until no input is given
}
