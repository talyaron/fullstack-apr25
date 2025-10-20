"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TodoApp {
    constructor() {
        this.users = [];
        this.tasks = [];
        this.selectedUser = null;
        this.showCompleted = true;
        this.apiUrl = 'http://localhost:3000/api';
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setupEventListeners();
            yield this.loadUsers();
        });
    }
    setupEventListeners() {
        var _a, _b;
        const addUserBtn = document.getElementById('addUserBtn');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const showCompletedCheckbox = document.getElementById('showCompleted');
        addUserBtn === null || addUserBtn === void 0 ? void 0 : addUserBtn.addEventListener('click', () => this.addUser());
        addTaskBtn === null || addTaskBtn === void 0 ? void 0 : addTaskBtn.addEventListener('click', () => this.addTask());
        showCompletedCheckbox === null || showCompletedCheckbox === void 0 ? void 0 : showCompletedCheckbox.addEventListener('change', (e) => {
            this.showCompleted = e.target.checked;
            this.renderTasks();
        });
        (_a = document.getElementById('userName')) === null || _a === void 0 ? void 0 : _a.addEventListener('keypress', (e) => {
            if (e.key === 'Enter')
                this.addUser();
        });
        (_b = document.getElementById('userEmail')) === null || _b === void 0 ? void 0 : _b.addEventListener('keypress', (e) => {
            if (e.key === 'Enter')
                this.addUser();
        });
    }
    loadUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiUrl}/users`);
                if (!response.ok)
                    throw new Error('Failed to fetch users');
                this.users = yield response.json();
                this.renderUsers();
            }
            catch (error) {
                console.error('Error loading users:', error);
            }
        });
    }
    loadTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = userId
                    ? `${this.apiUrl}/users/${userId}/tasks`
                    : `${this.apiUrl}/tasks`;
                const response = yield fetch(url);
                if (!response.ok)
                    throw new Error('Failed to fetch tasks');
                this.tasks = yield response.json();
                this.renderTasks();
            }
            catch (error) {
                console.error('Error loading tasks:', error);
            }
        });
    }
    addUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const nameInput = document.getElementById('userName');
            const emailInput = document.getElementById('userEmail');
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            if (!name || !email) {
                alert('Please enter both name and email');
                return;
            }
            try {
                const response = yield fetch(`${this.apiUrl}/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email })
                });
                if (!response.ok)
                    throw new Error('Failed to create user');
                const newUser = yield response.json();
                this.users.push(newUser);
                this.renderUsers();
                nameInput.value = '';
                emailInput.value = '';
            }
            catch (error) {
                console.error('Error adding user:', error);
                alert('Failed to add user. Email might already exist.');
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!confirm('Are you sure you want to delete this user? All their tasks will be orphaned.')) {
                return;
            }
            try {
                const response = yield fetch(`${this.apiUrl}/users/${userId}`, {
                    method: 'DELETE'
                });
                if (!response.ok)
                    throw new Error('Failed to delete user');
                this.users = this.users.filter(u => u._id !== userId);
                if (((_a = this.selectedUser) === null || _a === void 0 ? void 0 : _a._id) === userId) {
                    this.selectedUser = null;
                    this.tasks = [];
                    this.updateSelectedUserDisplay();
                    this.renderTasks();
                }
                this.renderUsers();
            }
            catch (error) {
                console.error('Error deleting user:', error);
            }
        });
    }
    selectUser(user) {
        this.selectedUser = user;
        this.updateSelectedUserDisplay();
        this.loadTasks(user._id);
        this.renderUsers();
    }
    updateSelectedUserDisplay() {
        const selectedUserDiv = document.getElementById('selectedUser');
        const taskForm = document.getElementById('taskForm');
        if (this.selectedUser) {
            if (selectedUserDiv) {
                selectedUserDiv.textContent = `Selected: ${this.selectedUser.name} (${this.selectedUser.email})`;
            }
            if (taskForm) {
                taskForm.style.display = 'flex';
            }
        }
        else {
            if (selectedUserDiv) {
                selectedUserDiv.textContent = 'Please select a user to manage tasks';
            }
            if (taskForm) {
                taskForm.style.display = 'none';
            }
        }
    }
    addTask() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.selectedUser) {
                alert('Please select a user first');
                return;
            }
            const titleInput = document.getElementById('taskTitle');
            const descriptionInput = document.getElementById('taskDescription');
            const levelSelect = document.getElementById('taskLevel');
            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();
            const level = parseInt(levelSelect.value);
            if (!title || !description) {
                alert('Please enter both title and description');
                return;
            }
            try {
                const response = yield fetch(`${this.apiUrl}/tasks`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title,
                        description,
                        level,
                        userId: this.selectedUser._id
                    })
                });
                if (!response.ok)
                    throw new Error('Failed to create task');
                const newTask = yield response.json();
                this.tasks.push(newTask);
                this.renderTasks();
                titleInput.value = '';
                descriptionInput.value = '';
                levelSelect.value = '1';
            }
            catch (error) {
                console.error('Error adding task:', error);
            }
        });
    }
    toggleTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = this.tasks.find(t => t._id === taskId);
            if (!task)
                return;
            try {
                const response = yield fetch(`${this.apiUrl}/tasks/${taskId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ done: !task.done })
                });
                if (!response.ok)
                    throw new Error('Failed to update task');
                const updatedTask = yield response.json();
                const index = this.tasks.findIndex(t => t._id === taskId);
                if (index !== -1) {
                    this.tasks[index] = updatedTask;
                    this.renderTasks();
                }
            }
            catch (error) {
                console.error('Error toggling task:', error);
            }
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!confirm('Are you sure you want to delete this task?')) {
                return;
            }
            try {
                const response = yield fetch(`${this.apiUrl}/tasks/${taskId}`, {
                    method: 'DELETE'
                });
                if (!response.ok)
                    throw new Error('Failed to delete task');
                this.tasks = this.tasks.filter(t => t._id !== taskId);
                this.renderTasks();
            }
            catch (error) {
                console.error('Error deleting task:', error);
            }
        });
    }
    renderUsers() {
        const usersList = document.getElementById('usersList');
        if (!usersList)
            return;
        usersList.innerHTML = this.users.map(user => {
            var _a;
            return `
            <div class="user-item ${((_a = this.selectedUser) === null || _a === void 0 ? void 0 : _a._id) === user._id ? 'selected' : ''}"
                 data-user-id="${user._id}">
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                </div>
                <button class="delete-btn" data-action="delete" data-user-id="${user._id}">
                    Delete
                </button>
            </div>
        `;
        }).join('');
        usersList.addEventListener('click', (e) => {
            const target = e.target;
            const userItem = target.closest('.user-item');
            if (!userItem)
                return;
            const userId = userItem.dataset.userId;
            if (!userId)
                return;
            if (target.dataset.action === 'delete') {
                e.stopPropagation();
                this.deleteUser(userId);
            }
            else {
                const user = this.users.find(u => u._id === userId);
                if (user)
                    this.selectUser(user);
            }
        });
    }
    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        if (!tasksList)
            return;
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
            const target = e.target;
            if (target.type === 'checkbox' && target.dataset.taskId) {
                this.toggleTask(target.dataset.taskId);
            }
        });
        tasksList.addEventListener('click', (e) => {
            const target = e.target;
            if (target.dataset.action === 'delete' && target.dataset.taskId) {
                this.deleteTask(target.dataset.taskId);
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
