import api from './api.js';
import type { RegisterData } from './types.js';

// Elements
const registerForm = document.getElementById('registerForm') as HTMLFormElement;
const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement;
const message = document.getElementById('message') as HTMLDivElement;

const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
const militaryIdInput = document.getElementById('militaryId') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
const phoneNumberInput = document.getElementById('phoneNumber') as HTMLInputElement;
const rankInput = document.getElementById('rank') as HTMLSelectElement;
const unitInput = document.getElementById('unit') as HTMLInputElement;

// Redirect if already logged in
if (api.isAuthenticated()) {
  window.location.href = '/dashboard.html';
}

// Form submission
registerForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  // Clear errors
  clearErrors();

  // Collect data
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const username = militaryIdInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const phoneNumber = phoneNumberInput.value.trim();
  const rank = rankInput.value;
  const unit = unitInput.value.trim();

  // Validation
  if (!firstName || !lastName) {
    showMessage('נא למלא שם פרטי ושם משפחה', 'error');
    return;
  }

  if (!username || !username.includes('@')) {
    militaryIdInput.classList.add('error');
    showMessage('נא להזין כתובת אימייל תקינה', 'error');
    return;
  }

  if (password.length < 6) {
    passwordInput.classList.add('error');
    showMessage('הסיסמה חייבת להכיל לפחות 6 תווים', 'error');
    return;
  }

  if (password !== confirmPassword) {
    confirmPasswordInput.classList.add('error');
    showMessage('הסיסמאות אינן תואמות', 'error');
    return;
  }

  // Loading state
  registerBtn.disabled = true;
  registerBtn.textContent = 'רושם...';

  try {
    const registerData: RegisterData = {
      username,
      password,
      firstName,
      lastName,
      phoneNumber: phoneNumber || undefined,
      rank: rank || undefined,
      unit: unit || undefined,
    };
    
    await api.register(registerData);
    
    showMessage('נרשמת בהצלחה! מעביר אותך להתחברות...', 'success');

    setTimeout(() => {
      window.location.href = '/index.html';
    }, 2000);
  } catch (error: any) {
    console.error('❌ Registration error:', error);
    showMessage(error.message || 'שגיאה בהרשמה, נסה שוב', 'error');
  } finally {
    registerBtn.disabled = false;
    registerBtn.textContent = 'הרשם למערכת';
  }
});

function showMessage(text: string, type: 'error' | 'success'): void {
  message.textContent = text;
  message.className = `message ${type} show`;
  setTimeout(() => message.classList.remove('show'), 5000);
}

function clearErrors(): void {
  const inputs = registerForm.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select');
  inputs.forEach((input) => input.classList.remove('error'));
}

// Remove error on input
const inputs = registerForm.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select');
inputs.forEach((input) => {
  input.addEventListener('input', function (this: HTMLInputElement | HTMLSelectElement) {
    this.classList.remove('error');
  });
});