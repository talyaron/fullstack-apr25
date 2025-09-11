interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // comes as string from API
}

async function fetchTasks() {
  const res = await fetch('/tasks');
  const tasks: Task[] = await res.json();

  const list = document.getElementById('task-list');
  if (!list) return;
  list.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = `${task.title} - ${task.completed ? 'Done' : 'Pending'}`;
    list.appendChild(li);
  });
}

async function addTask(event: Event) {
  event.preventDefault();
  const input = document.getElementById('task-title') as HTMLInputElement;
  if (!input.value.trim()) return alert('Title is required');

  await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input.value }),
  });

  input.value = '';
  fetchTasks();
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  form?.addEventListener('submit', addTask);

  fetchTasks();
});
