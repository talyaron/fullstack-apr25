import api from './api.js';  

// Types
interface LoginFormData {
  militaryId: string;
  password: string;
  remember: boolean;
}

type MessageType = 'success' | 'error';

// Form elements
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement;
const message = document.getElementById('message') as HTMLDivElement;
const militaryIdInput = document.getElementById('militaryId') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const rememberCheckbox = document.getElementById('remember') as HTMLInputElement;

// ===============================================
// REDIRECT IF ALREADY LOGGED IN
// ===============================================
if (api.isAuthenticated()) {
  window.location.href = '/dashboard.html';
}

// ===============================================
// FORM SUBMISSION
// ===============================================
loginForm.addEventListener('submit', async (e: Event): Promise<void> => {
  e.preventDefault();

  const formData: LoginFormData = {
    militaryId: militaryIdInput.value.trim(),
    password: passwordInput.value,
    remember: rememberCheckbox.checked,
  };

  // Remove error states
  militaryIdInput.classList.remove('error');
  passwordInput.classList.remove('error');

  // Validate military ID (username)
  if (!formData.militaryId) {
    militaryIdInput.classList.add('error');
    showMessage('נא להזין מספר אישי', 'error');
    return;
  }

  // Validate password
  if (!formData.password || formData.password.length < 6) {
    passwordInput.classList.add('error');
    showMessage('הסיסמה חייבת להכיל לפחות 6 תווים', 'error');
    return;
  }

  // Show loading state
  setLoadingState(true);

  try {
    // ✅ התחברות אמיתית לשרת
    const response = await api.login(formData.militaryId, formData.password);

    console.log('✅ Login successful:', response);

    showMessage('התחברת בהצלחה! מעביר אותך...', 'success');

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 1000);

  } catch (error: any) {
    console.error('❌ Login error:', error);
    showMessage(
      error.message || 'מספר אישי או סיסמה שגויים',
      'error'
    );
  } finally {
    setLoadingState(false);
  }
});

// ===============================================
// HELPER FUNCTIONS
// ===============================================

const setLoadingState = (isLoading: boolean): void => {
  if (isLoading) {
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    loginBtn.textContent = 'מתחבר...';
  } else {
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
    loginBtn.textContent = 'כניסה למערכת';
  }
};

const showMessage = (text: string, type: MessageType): void => {
  message.textContent = text;
  message.className = `login__message ${type} show`;

  setTimeout(() => {
    message.classList.remove('show');
  }, 5000);
};

// ===============================================
// FORGOT PASSWORD
// ===============================================
const forgotPasswordLink = document.querySelector('.login__forgot') as HTMLAnchorElement;
forgotPasswordLink?.addEventListener('click', (e: Event): void => {
  e.preventDefault();
  showMessage('בקשה לאיפוס סיסמה נשלחה למפקד', 'success');
});

// ===============================================
// REMOVE ERROR ON INPUT
// ===============================================
const inputs = document.querySelectorAll<HTMLInputElement>('.login__input');
inputs.forEach((input: HTMLInputElement) => {
  input.addEventListener('input', function (this: HTMLInputElement): void {
    this.classList.remove('error');
  });
});