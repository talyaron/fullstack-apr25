// Student Interface - matching your exact structure
interface Student {
  name: string;
  age: number;
  grade: string;
  subjects: string[];
  img: string;
}

interface GradeDistribution {
  [key: string]: number;
}

interface ApiResponse<T> {
  ok?: boolean;
  message?: string;
  error?: string;
  students?: T[];
  student?: T;
  studentAmount?: number;
  averageGrade?: number;
  averageGradeLetter?: string;
  distribution?: GradeDistribution;
  totalStudents?: number;
}

class StudentManagementApp {
  private baseUrl = 'http://localhost:5000';
  private students: Student[] = [];
  private filteredStudents: Student[] = [];
  private currentFilter = 'all';
  private searchTerm = '';

  // DOM Elements
  private elements = {
    studentsGrid: document.getElementById('studentsGrid') as HTMLDivElement,
    loadingSpinner: document.getElementById('loadingSpinner') as HTMLDivElement,
    emptyState: document.getElementById('emptyState') as HTMLDivElement,
    totalStudents: document.getElementById('totalStudents') as HTMLSpanElement,
    averageGrade: document.getElementById('averageGrade') as HTMLSpanElement,
    distributionBars: document.getElementById('distributionBars') as HTMLDivElement,
    addStudentBtn: document.getElementById('addStudentBtn') as HTMLButtonElement,
    refreshBtn: document.getElementById('refreshBtn') as HTMLButtonElement,
    gradeFilter: document.getElementById('gradeFilter') as HTMLSelectElement,
    searchInput: document.getElementById('searchInput') as HTMLInputElement,
    addStudentModal: document.getElementById('addStudentModal') as HTMLDivElement,
    addStudentForm: document.getElementById('addStudentForm') as HTMLFormElement,
    closeModal: document.getElementById('closeModal') as HTMLButtonElement,
    modalOverlay: document.getElementById('modalOverlay') as HTMLDivElement,
    cancelBtn: document.getElementById('cancelBtn') as HTMLButtonElement,
    toastContainer: document.getElementById('toastContainer') as HTMLDivElement
  };

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    this.setupEventListeners();
    await this.loadStudents();
    await this.loadStats();
    await this.loadGradeDistribution();
  }

  private setupEventListeners(): void {
    // Button events
    this.elements.addStudentBtn.addEventListener('click', () => this.openModal());
    this.elements.refreshBtn.addEventListener('click', () => this.refreshData());
    this.elements.closeModal.addEventListener('click', () => this.closeModal());
    this.elements.modalOverlay.addEventListener('click', () => this.closeModal());
    this.elements.cancelBtn.addEventListener('click', () => this.closeModal());

    // Form events
    this.elements.addStudentForm.addEventListener('submit', (e) => this.handleAddStudent(e));

    // Filter and search events
    this.elements.gradeFilter.addEventListener('change', (e) => this.handleGradeFilter(e));
    this.elements.searchInput.addEventListener('input', (e) => this.handleSearch(e));

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  private async apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      this.showToast(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      throw error;
    }
  }

  private async loadStudents(): Promise<void> {
    try {
      this.showLoading(true);
      const response = await this.apiCall<Student>('/student/get-students');
      
      if (response.students) {
        this.students = response.students;
        this.applyFilters();
        this.renderStudents();
      }
    } catch (error) {
      this.showEmptyState();
    } finally {
      this.showLoading(false);
    }
  }

  private async loadStats(): Promise<void> {
    try {
      const [amountResponse, gradeResponse] = await Promise.all([
        this.apiCall<never>('/student/get-amount'),
        this.apiCall<never>('/student/get-average-grade')
      ]);

      if (amountResponse.studentAmount !== undefined) {
        this.elements.totalStudents.textContent = amountResponse.studentAmount.toString();
      }

      if (gradeResponse.averageGradeLetter) {
        this.elements.averageGrade.textContent = gradeResponse.averageGradeLetter;
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  }

  private async loadGradeDistribution(): Promise<void> {
    try {
      const response = await this.apiCall<never>('/student/grade-distribution');
      
      if (response.distribution && response.totalStudents) {
        this.renderGradeDistribution(response.distribution, response.totalStudents);
      }
    } catch (error) {
      console.error('Failed to load grade distribution:', error);
    }
  }

  private renderGradeDistribution(distribution: GradeDistribution, total: number): void {
    const grades = ['A', 'B', 'C', 'D', 'F'];
    const barsHtml = grades.map(grade => {
      const count = distribution[grade] || 0;
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      const height = total > 0 ? (count / total) * 100 : 0;

      return `
        <div class="distribution-bar">
          <div class="distribution-bar__label">Grade ${grade}</div>
          <div class="distribution-bar__bar">
            <div class="distribution-bar__bar--filled distribution-bar__bar--${grade.toLowerCase()}" 
                 style="height: ${height}%">
              <div class="distribution-bar__count">${count}</div>
            </div>
          </div>
          <div class="distribution-bar__percentage">${percentage}%</div>
        </div>
      `;
    }).join('');

    this.elements.distributionBars.innerHTML = barsHtml;
  }

  private applyFilters(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesGrade = this.currentFilter === 'all' || student.grade === this.currentFilter;
      const matchesSearch = this.searchTerm === '' || 
        student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.subjects.some(subject => 
          subject.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      
      return matchesGrade && matchesSearch;
    });
  }

  private renderStudents(): void {
    if (this.filteredStudents.length === 0) {
      this.showEmptyState();
      return;
    }

    const studentsHtml = this.filteredStudents.map(student => this.createStudentCard(student)).join('');
    this.elements.studentsGrid.innerHTML = studentsHtml;
    this.elements.emptyState.style.display = 'none';

    // Add event listeners to action buttons
    this.addCardEventListeners();
  }

  private createStudentCard(student: Student): string {
    const gradeClass = `student-card__grade--${student.grade.toLowerCase()}`;
    const subjectTags = student.subjects.map(subject => 
      `<span class="student-card__subject-tag">${subject}</span>`
    ).join('');

    return `
      <div class="student-card">
        <img src="${student.img}" alt="${student.name}" class="student-card__image" 
             onerror="this.src='https://via.placeholder.com/80x80/667eea/white?text=${student.name.charAt(0)}'">
        <h3 class="student-card__name">${student.name}</h3>
        <p class="student-card__age">Age: ${student.age}</p>
        <div class="student-card__grade ${gradeClass}">Grade ${student.grade}</div>
        
        <div class="student-card__subjects">
          <h4>Subjects:</h4>
          <div class="student-card__subject-tags">
            ${subjectTags}
          </div>
        </div>
        
        <div class="student-card__actions">
          <button class="btn btn--secondary student-card__btn" data-action="edit" data-student="${student.name}">
            Edit Grade
          </button>
          <button class="btn btn--danger student-card__btn" data-action="delete" data-student="${student.name}">
            Delete
          </button>
        </div>
      </div>
    `;
  }

  private addCardEventListeners(): void {
    // Add event listeners to all action buttons
    const actionButtons = document.querySelectorAll('[data-action]');
    actionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const action = target.getAttribute('data-action');
        const studentName = target.getAttribute('data-student');
        
        if (!studentName) return;
        
        if (action === 'edit') {
          this.editStudentGrade(studentName);
        } else if (action === 'delete') {
          this.deleteStudent(studentName);
        }
      });
    });
  }

  public async editStudentGrade(studentName: string): Promise<void> {
    const student = this.students.find(s => s.name === studentName);
    if (!student) return;

    const newGrade = prompt(`Enter new grade for ${studentName} (current: ${student.grade}):`, student.grade);
    if (!newGrade || newGrade === student.grade) return;

    const validGrades = ['A', 'B', 'C', 'D', 'F'];
    if (!validGrades.includes(newGrade.toUpperCase())) {
      this.showToast('Invalid grade. Please use A, B, C, D, or F', 'error');
      return;
    }

    try {
      await this.apiCall(`/student/update-grade/${encodeURIComponent(studentName)}`, {
        method: 'PUT',
        body: JSON.stringify({ grade: newGrade.toUpperCase() })
      });

      this.showToast(`Grade updated successfully for ${studentName}`, 'success');
      await this.refreshData();
    } catch (error) {
      console.error('Failed to update grade:', error);
    }
  }

  public async deleteStudent(studentName: string): Promise<void> {
    if (!confirm(`Are you sure you want to delete ${studentName}?`)) return;

    try {
      await this.apiCall(`/student/delete/${encodeURIComponent(studentName)}`, {
        method: 'DELETE'
      });

      this.showToast(`${studentName} deleted successfully`, 'success');
      await this.refreshData();
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  }

  private async handleAddStudent(e: Event): Promise<void> {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const studentData: Student = {
      name: (document.getElementById('studentName') as HTMLInputElement).value.trim(),
      age: parseInt((document.getElementById('studentAge') as HTMLInputElement).value),
      grade: (document.getElementById('studentGrade') as HTMLSelectElement).value,
      subjects: (document.getElementById('studentSubjects') as HTMLInputElement).value
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0),
      img: (document.getElementById('studentImage') as HTMLInputElement).value.trim()
    };

    // Validation
    if (!studentData.name || !studentData.age || !studentData.grade || 
        studentData.subjects.length === 0 || !studentData.img) {
      this.showToast('Please fill in all fields', 'error');
      return;
    }

    try {
      await this.apiCall<Student>('/student/add-student', {
        method: 'POST',
        body: JSON.stringify(studentData)
      });

      this.showToast('Student added successfully!', 'success');
      form.reset();
      this.closeModal();
      await this.refreshData();
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  }

  private handleGradeFilter(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.currentFilter = target.value;
    this.applyFilters();
    this.renderStudents();
  }

  private handleSearch(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.applyFilters();
    this.renderStudents();
  }

  private async refreshData(): Promise<void> {
    await Promise.all([
      this.loadStudents(),
      this.loadStats(),
      this.loadGradeDistribution()
    ]);
    this.showToast('Data refreshed successfully!', 'info');
  }

  private openModal(): void {
    this.elements.addStudentModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  private closeModal(): void {
    this.elements.addStudentModal.classList.remove('show');
    document.body.style.overflow = '';
    this.elements.addStudentForm.reset();
  }

  private showLoading(show: boolean): void {
    this.elements.loadingSpinner.style.display = show ? 'flex' : 'none';
    this.elements.studentsGrid.style.display = show ? 'none' : 'grid';
  }

  private showEmptyState(): void {
    this.elements.emptyState.style.display = 'block';
    this.elements.studentsGrid.style.display = 'none';
    this.elements.loadingSpinner.style.display = 'none';
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const toastId = `toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      ${message}
      <button class="toast__close" data-toast-id="${toastId}">&times;</button>
    `;

    // Add close button event listener
    const closeBtn = toast.querySelector('.toast__close');
    closeBtn?.addEventListener('click', () => this.closeToast(toastId));

    this.elements.toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
      this.closeToast(toastId);
    }, 5000);
  }
  public closeToast(toastId: string): void {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new StudentManagementApp();
});