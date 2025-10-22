// ===============================================
// LOGIN PAGE TYPESCRIPT
// ===============================================

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

// Handle form submission
loginForm.addEventListener('submit', (e: Event): void => {
  e.preventDefault();

  const formData: LoginFormData = {
    militaryId: militaryIdInput.value.trim(),
    password: passwordInput.value,
    remember: rememberCheckbox.checked,
  };

  // Remove error states
  militaryIdInput.classList.remove('error');
  passwordInput.classList.remove('error');

  // Validate military ID
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

  // Simulate API call
  simulateLogin(formData);
});

// Set loading state
const setLoadingState = (isLoading: boolean): void => {
  if (isLoading) {
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
  } else {
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
  }
};

// Simulate login API call
const simulateLogin = (formData: LoginFormData): void => {
  setTimeout(() => {
    setLoadingState(false);

    // Success simulation
    if (formData.militaryId && formData.password.length >= 6) {
      showMessage('התחברת בהצלחה! מעביר אותך...', 'success');

      setTimeout(() => {
        console.log('Login successful:', formData);
        // Redirect to dashboard
        // window.location.href = '/dashboard';
      }, 1500);
    } else {
      showMessage('מספר אישי או סיסמה שגויים', 'error');
    }
  }, 1200);
};

// Show message function
const showMessage = (text: string, type: MessageType): void => {
  message.textContent = text;
  message.className = `message ${type} show`;

  setTimeout(() => {
    message.classList.remove('show');
  }, 5000);
};

// Handle forgot password
const forgotPasswordLink = document.querySelector('.forgot-password') as HTMLAnchorElement;
forgotPasswordLink.addEventListener('click', (e: Event): void => {
  e.preventDefault();
  showMessage('בקשה לאיפוס סיסמה נשלחה למפקד', 'success');
});

// Remove error state on input
const inputs = document.querySelectorAll<HTMLInputElement>('input[type="text"], input[type="password"]');
inputs.forEach((input: HTMLInputElement) => {
  input.addEventListener('input', function (this: HTMLInputElement): void {
    this.classList.remove('error');
  });
});