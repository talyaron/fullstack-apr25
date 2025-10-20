interface User {
    _id: string;
    name: string;
    email: string;
}

interface Task {
    _id: string;
    title: string;
    description: string;
    done: boolean;
    level: number;
    userId: User | string;
    createdAt: string;
}

class TodoApp {
    private users: User[] = [];
    private tasks: Task[] = [];
    private selectedUser: User | null = null;
    private showCompleted: boolean = true;
    private apiUrl: string = 'http://localhost:3000/api';

    constructor() {
        this.init();
    }

    private async init(): Promise<void> {
        this.setupEventListeners();
        await this.loadUser();
    }

    private setupEventListeners(): void {
        const addUserBtn = document.getElementById('addUserBtn');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const showCompletedCheckbox = document.getElementById('showCompleted') as HTMLInputElement;

        addUserBtn?.addEventListener('click', () => this.addUser());
        addTaskBtn?.addEventListener('click', () => this.addTask());
        showCompletedCheckbox?.addEventListener('change', (e) => {
            this.showCompleted = (e.target as HTMLInputElement).checked;
            this.renderTasks();
        });

        document.getElementById('userName')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addUser();
        });

        document.getElementById('userEmail')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addUser();
        });
    }

    private async loadUsers(): Promise<void> {
        try {
            const response = await fetch(`${this.apiUrl}/users`);
            if (!response.ok) throw new Error('Failed to fetch users');
            this.users = await response.json();
            this.renderUsers();
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    private async loadUser(): Promise<void> {
        try {
            console.log("Loading user from cookie...");
            const response = await fetch(`${this.apiUrl}/users/userId`);
            if (!response.ok) throw new Error('Failed to fetch user');
            const user = await response.json();
            console.log("user from cookie:", user);
            this.selectedUser = user;
            this.updateSelectedUserDisplay();
            this.loadTasks(user._id);
            // this.loadUserTasks();

        } catch (error) {
            console.error('Error loading user:', error);
        }
    }

    private async loadTasks(userId?: string): Promise<void> {
        try {
            const url = userId
                ? `${this.apiUrl}/users/${userId}/tasks`
                : `${this.apiUrl}/tasks`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch tasks');
            this.tasks = await response.json();
            this.renderTasks();
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    private async addUser(): Promise<void> {
        const nameInput = document.getElementById('userName') as HTMLInputElement;
        const emailInput = document.getElementById('userEmail') as HTMLInputElement;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (!name || !email) {
            alert('Please enter both name and email');
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });

            if (!response.ok) throw new Error('Failed to create user');

            const newUser = await response.json();
            this.users.push(newUser);
            this.renderUsers();

            nameInput.value = '';
            emailInput.value = '';
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user. Email might already exist.');
        }
    }

    private async deleteUser(userId: string): Promise<void> {
        if (!confirm('Are you sure you want to delete this user? All their tasks will be orphaned.')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/users/${userId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete user');

            this.users = this.users.filter(u => u._id !== userId);
            if (this.selectedUser?._id === userId) {
                this.selectedUser = null;
                this.tasks = [];
                this.updateSelectedUserDisplay();
                this.renderTasks();
            }
            this.renderUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    private selectUser(user: User): void {
        this.selectedUser = user;
        this.updateSelectedUserDisplay();
        this.loadTasks(user._id);
        this.renderUsers();
    }

    private updateSelectedUserDisplay(): void {
        const selectedUserDiv = document.getElementById('selectedUser');
        const taskForm = document.getElementById('taskForm');

        if (this.selectedUser) {
            if (selectedUserDiv) {
                selectedUserDiv.textContent = `Selected: ${this.selectedUser.name} (${this.selectedUser.email})`;
            }
            if (taskForm) {
                taskForm.style.display = 'flex';
            }
        } else {
            if (selectedUserDiv) {
                selectedUserDiv.textContent = 'Please select a user to manage tasks';
            }
            if (taskForm) {
                taskForm.style.display = 'none';
            }
        }
    }

    private async addTask(): Promise<void> {
        if (!this.selectedUser) {
            alert('Please select a user first');
            return;
        }

        const titleInput = document.getElementById('taskTitle') as HTMLInputElement;
        const descriptionInput = document.getElementById('taskDescription') as HTMLTextAreaElement;
        const levelSelect = document.getElementById('taskLevel') as HTMLSelectElement;

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const level = parseInt(levelSelect.value);

        if (!title || !description) {
            alert('Please enter both title and description');
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    level,
                    userId: this.selectedUser._id
                })
            });

            if (!response.ok) throw new Error('Failed to create task');

            const newTask = await response.json();
            this.tasks.push(newTask);
            this.renderTasks();

            titleInput.value = '';
            descriptionInput.value = '';
            levelSelect.value = '1';
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    private async toggleTask(taskId: string): Promise<void> {
        const task = this.tasks.find(t => t._id === taskId);
        if (!task) return;

        try {
            const response = await fetch(`${this.apiUrl}/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: !task.done })
            });

            if (!response.ok) throw new Error('Failed to update task');

            const updatedTask = await response.json();
            const index = this.tasks.findIndex(t => t._id === taskId);
            if (index !== -1) {
                this.tasks[index] = updatedTask;
                this.renderTasks();
            }
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    }

    private async deleteTask(taskId: string): Promise<void> {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/tasks/${taskId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete task');

            this.tasks = this.tasks.filter(t => t._id !== taskId);
            this.renderTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    private renderUsers(): void {
        const usersList = document.getElementById('usersList');
        if (!usersList) return;

        usersList.innerHTML = this.users.map(user => `
            <div class="user-item ${this.selectedUser?._id === user._id ? 'selected' : ''}"
                 data-user-id="${user._id}">
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                </div>
                <button class="delete-btn" data-action="delete" data-user-id="${user._id}">
                    Delete
                </button>
            </div>
        `).join('');

        usersList.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const userItem = target.closest('.user-item') as HTMLElement;

            if (!userItem) return;

            const userId = userItem.dataset.userId;
            if (!userId) return;

            if (target.dataset.action === 'delete') {
                e.stopPropagation();
                this.deleteUser(userId);
            } else {
                const user = this.users.find(u => u._id === userId);
                if (user) this.selectUser(user);
            }
        });
    }

    private renderTasks(): void {
        const tasksList = document.getElementById('tasksList');
        if (!tasksList) return;

        const filteredTasks = this.showCompleted
            ? this.tasks
            : this.tasks.filter(t => !t.done);

        if (filteredTasks.length === 0) {
            tasksList.innerHTML = '<div style="text-align: center; color: #999; padding: 20px;">No tasks to display</div>';
            return;
        }

        tasksList.innerHTML = filteredTasks.map(task => {
            const user = typeof task.userId === 'object' ? task.userId : null;
            return `
                <div class="task-item ${task.done ? 'completed' : ''}" data-task-id="${task._id}">
                    <input type="checkbox"
                           class="task-checkbox"
                           ${task.done ? 'checked' : ''}
                           data-task-id="${task._id}">
                    <div class="task-content">
                        <div class="task-header">
                            <span class="task-title">${task.title}</span>
                            <span class="task-level level-${task.level}">Level ${task.level}</span>
                        </div>
                        <div class="task-description">${task.description}</div>
                        ${user ? `<div class="task-meta">Assigned to: ${user.name}</div>` : ''}
                    </div>
                    <div class="task-actions">
                        <button class="delete-btn" data-action="delete" data-task-id="${task._id}">
                            Delete
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        tasksList.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.type === 'checkbox' && target.dataset.taskId) {
                this.toggleTask(target.dataset.taskId);
            }
        });

        tasksList.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.dataset.action === 'delete' && target.dataset.taskId) {
                this.deleteTask(target.dataset.taskId);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});