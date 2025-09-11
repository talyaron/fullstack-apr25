import { StudentAPI } from './api.js';
class StudentApp {
    constructor() {
        this.students = [];
        this.editingStudentId = null;
        this.init();
    }
    async init() {
        await this.loadStudents();
        this.setupEventListeners();
    }
    setupEventListeners() {
        const addForm = document.getElementById('add-student-form');
        if (addForm) {
            addForm.addEventListener('submit', (e) => this.handleAddStudent(e));
        }
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadStudents());
        }
    }
    async loadStudents() {
        try {
            this.showLoading(true);
            this.students = await StudentAPI.getAllStudents();
            this.renderStudents();
            this.showMessage('Students loaded successfully', 'success');
        }
        catch (error) {
            this.showMessage('Failed to load students', 'error');
        }
        finally {
            this.showLoading(false);
        }
    }
    renderStudents() {
        const container = document.getElementById('students-list');
        if (!container)
            return;
        if (this.students.length === 0) {
            container.innerHTML = '<p class="no-students">No students found</p>';
            return;
        }
        const studentsHTML = this.students.map(student => `
            <div class="student-card" data-student-id="${student.id}">
                <div class="student-info">
                    <h3>${student.name}</h3>
                    <div class="student-age">
                        ${this.editingStudentId === student.id ?
            `<input type="number" id="edit-age-${student.id}" value="${student.age}" min="1" max="120" />` :
            `Age: <span>${student.age}</span>`}
                    </div>
                </div>
                <div class="student-actions">
                    ${this.editingStudentId === student.id ?
            `
                        <button class="btn btn-success" onclick="app.saveStudent(${student.id})">Save</button>
                        <button class="btn btn-secondary" onclick="app.cancelEdit()">Cancel</button>
                        ` :
            `
                        <button class="btn btn-primary" onclick="app.editStudent(${student.id})">Edit</button>
                        <button class="btn btn-danger" onclick="app.deleteStudent(${student.id})">Delete</button>
                        `}
                </div>
            </div>
        `).join('');
        container.innerHTML = studentsHTML;
    }
    async handleAddStudent(event) {
        event.preventDefault();
        const form = event.target;
        const nameInput = form.querySelector('#student-name');
        const ageInput = form.querySelector('#student-age');
        if (!nameInput || !ageInput)
            return;
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        if (!name || !age || age < 1) {
            this.showMessage('Please enter valid name and age', 'error');
            return;
        }
        try {
            await StudentAPI.addStudent({ name, age });
            this.showMessage('Student added successfully', 'success');
            form.reset();
            await this.loadStudents();
        }
        catch (error) {
            this.showMessage('Failed to add student', 'error');
        }
    }
    editStudent(id) {
        this.editingStudentId = id;
        this.renderStudents();
    }
    cancelEdit() {
        this.editingStudentId = null;
        this.renderStudents();
    }
    async saveStudent(id) {
        const input = document.getElementById(`edit-age-${id}`);
        if (!input)
            return;
        const age = parseInt(input.value);
        if (!age || age < 1) {
            this.showMessage('Please enter a valid age', 'error');
            return;
        }
        try {
            await StudentAPI.updateStudent(id, age);
            this.showMessage('Student updated successfully', 'success');
            this.editingStudentId = null;
            await this.loadStudents();
        }
        catch (error) {
            this.showMessage('Failed to update student', 'error');
        }
    }
    async deleteStudent(id) {
        if (!confirm('Are you sure you want to delete this student?')) {
            return;
        }
        try {
            await StudentAPI.deleteStudent(id);
            this.showMessage('Student deleted successfully', 'success');
            await this.loadStudents();
        }
        catch (error) {
            this.showMessage('Failed to delete student', 'error');
        }
    }
    showMessage(message, type) {
        const messageEl = document.getElementById('message');
        if (!messageEl)
            return;
        messageEl.textContent = message;
        messageEl.className = `message ${type}`;
        messageEl.style.display = 'block';
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
    showLoading(show) {
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
            loadingEl.style.display = show ? 'block' : 'none';
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    window.app = new StudentApp();
});
