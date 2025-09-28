// src/public/script.ts

// Types and Interfaces
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLogin?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

interface FormElements {
  loginForm: HTMLFormElement;
  registerForm: HTMLFormElement;
  authContainer: HTMLElement;
  dashboard: HTMLElement;
  showRegisterBtn: HTMLButtonElement;
  showLoginBtn: HTMLButtonElement;
  logoutBtn: HTMLButtonElement;
  errorMessage: HTMLElement;
  successMessage: HTMLElement;
}

// DOM Elements
let elements: FormElements;

document.addEventListener('DOMContentLoaded', (): void => {
  // Initialize DOM elements with type checking
  elements = {
    loginForm: document.getElementById('loginForm') as HTMLFormElement,
    registerForm: document.getElementById('registerForm') as HTMLFormElement,
    authContainer: document.getElementById('authContainer') as HTMLElement,
    dashboard: document.getElementById('dashboard') as HTMLElement,
    showRegisterBtn: document.getElementById('showRegister') as HTMLButtonElement,
    showLoginBtn: document.getElementById('showLogin') as HTMLButtonElement,
    logoutBtn: document.getElementById('logoutBtn') as HTMLButtonElement,
    errorMessage: document.getElementById('errorMessage') as HTMLElement,
    successMessage: document.getElementById('successMessage') as HTMLElement
  };

  // Check for existing token
  const token: string | null = localStorage.getItem('token');
  if (token) {
    checkAuthStatus(token);
  }

  // Event listeners
  setupEventListeners();
  setupPasswordStrengthChecker();
});

function setupEventListeners(): void {
  // Form switching
  elements.showRegisterBtn.addEventListener('click', (): void => {
    elements.loginForm.classList.remove('form--active');
    elements.registerForm.classList.add('form--active');
    clearMessages();
  });

  elements.showLoginBtn.addEventListener('click', (): void => {
    elements.registerForm.classList.remove('form--active');
    elements.loginForm.classList.add('form--active');
    clearMessages();
  });

  // Form submissions
  elements.loginForm.addEventListener('submit', handleLogin);
  elements.registerForm.addEventListener('submit', handleRegister);

  // Logout
  elements.logoutBtn.addEventListener('click', handleLogout);
}

async function handleLogin(e: Event): Promise<void> {
  e.preventDefault();
  clearMessages();

  const formData = new FormData(elements.loginForm);
  const email: string = formData.get('email') as string;
  const password: string = formData.get('password') as string;

  try {
    const response: Response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data: AuthResponse = await response.json();

    if (data.success && data.token && data.user) {
      localStorage.setItem('token', data.token);
      showDashboard(data.user);
      showSuccessMessage('Login successful!');
    } else {
      showErrorMessage(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    showErrorMessage('Network error. Please try again.');
  }
}

async function handleRegister(e: Event): Promise<void> {
  e.preventDefault();
  clearMessages();

  const formData = new FormData(elements.registerForm);
  const name: string = formData.get('name') as string;
  const email: string = formData.get('email') as string;
  const password: string = formData.get('password') as string;
  const confirmPassword: string = formData.get('confirmPassword') as string;

  // Client-side validation
  if (!validateRegisterForm(name, email, password, confirmPassword)) {
    return;
  }

  try {
    const response: Response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, confirmPassword })
    });

    const data: AuthResponse = await response.json();

    if (data.success && data.token && data.user) {
      localStorage.setItem('token', data.token);
      showDashboard(data.user);
      showSuccessMessage('Account created successfully!');
    } else {
      showErrorMessage(data.message);
    }
  } catch (error) {
    console.error('Register error:', error);
    showErrorMessage('Network error. Please try again.');
  }
}

function validateRegisterForm(name: string, email: string, password: string, confirmPassword: string): boolean {
  if (!name.trim()) {
    showErrorMessage('Name is required');
    return false;
  }

  if (!isValidEmail(email)) {
    showErrorMessage('Please enter a valid email address');
    return false;
  }

  if (password.length < 6) {
    showErrorMessage('Password must be at least 6 characters');
    return false;
  }

  if (password !== confirmPassword) {
    showErrorMessage('Passwords do not match');
    return false;
  }

  return true;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function handleLogout(): void {
  localStorage.removeItem('token');
  showAuthForms();
  clearMessages();
  showSuccessMessage('Logged out successfully');
}

async function checkAuthStatus(token: string): Promise<void> {
  try {
    const response: Response = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data: AuthResponse = await response.json();

    if (data.success && data.user) {
      showDashboard(data.user);
    } else {
      localStorage.removeItem('token');
      showAuthForms();
    }
  } catch (error) {
    console.error('Auth check error:', error);
    localStorage.removeItem('token');
    showAuthForms();
  }
}

function showDashboard(user: User): void {
  elements.authContainer.style.display = 'none';
  elements.dashboard.style.display = 'block';

  // Update user information with null checks
  const userNameElement = document.getElementById('userName') as HTMLElement;
  const userEmailElement = document.getElementById('userEmail') as HTMLElement;
  const userDateElement = document.getElementById('userDate') as HTMLElement;
  const lastLoginElement = document.getElementById('lastLogin') as HTMLElement;

  if (userNameElement) userNameElement.textContent = user.name;
  if (userEmailElement) userEmailElement.textContent = user.email;
  if (userDateElement) userDateElement.textContent = new Date(user.createdAt).toLocaleDateString();
  if (lastLoginElement) {
    lastLoginElement.textContent = user.lastLogin ? 
      new Date(user.lastLogin).toLocaleString() : 'First login';
  }
}

function showAuthForms(): void {
  elements.authContainer.style.display = 'block';
  elements.dashboard.style.display = 'none';
  elements.registerForm.classList.remove('form--active');
  elements.loginForm.classList.add('form--active');
}

function showErrorMessage(message: string): void {
  elements.errorMessage.textContent = message;
  elements.errorMessage.style.display = 'block';
  elements.successMessage.style.display = 'none';
  
  setTimeout((): void => {
    elements.errorMessage.style.display = 'none';
  }, 5000);
}

function showSuccessMessage(message: string): void {
  elements.successMessage.textContent = message;
  elements.successMessage.style.display = 'block';
  elements.errorMessage.style.display = 'none';
  
  setTimeout((): void => {
    elements.successMessage.style.display = 'none';
  }, 5000);
}

function clearMessages(): void {
  elements.errorMessage.style.display = 'none';
  elements.successMessage.style.display = 'none';
}

// Password strength checker
function setupPasswordStrengthChecker(): void {
  const passwordInput = document.getElementById('registerPassword') as HTMLInputElement;
  const strengthDiv = document.getElementById('passwordStrength') as HTMLElement;

  if (passwordInput && strengthDiv) {
    passwordInput.addEventListener('input', function(): void {
      const password: string = this.value;
      const strength = checkPasswordStrength(password);
      strengthDiv.textContent = strength.text;
      strengthDiv.className = `form-group__helper strength-${strength.level}`;
    });
  }
}

interface PasswordStrength {
  level: 'weak' | 'medium' | 'strong';
  text: string;
}

function checkPasswordStrength(password: string): PasswordStrength {
  if (password.length < 6) {
    return { level: 'weak', text: 'Password too short' };
  }
  
  let score: number = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score < 2) return { level: 'weak', text: 'Weak password' };
  if (score < 3) return { level: 'medium', text: 'Medium strength' };
  return { level: 'strong', text: 'Strong password' };
} 