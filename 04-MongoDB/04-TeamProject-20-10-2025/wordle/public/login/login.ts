// Login.ts - MVC Architecture


// ========== MODEL ==========
class LoginModel {
  private email: string = '';
  private password: string = '';

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  validateInputs(): { isValid: boolean; error?: string } {
    if (!this.email || !this.password) {
      return { isValid: false, error: 'Please fill in all fields' };
    }

    if (!this.validateEmail()) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true };
  }

  async login(): Promise<{ ok: boolean; error?: string }> {
    try {
      console.log('Attempting login with', this.email, this.password);
      const response = await fetch("http://localhost:3000/user/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ email: this.email, password: this.password}),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        return { ok: false, error: data?.error || data?.message || 'Login failed' };
      }

      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Connection error. Please try again.' };
    }
  }
}

// ========== VIEW ==========
class LoginView {
  private loginForm: HTMLFormElement;
  private emailInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private errorMessage: HTMLDivElement;
  private registerLink: HTMLAnchorElement;

  constructor() {
    this.loginForm = document.getElementById('loginForm') as HTMLFormElement;
    this.emailInput = document.getElementById('email') as HTMLInputElement;
    this.passwordInput = document.getElementById('password') as HTMLInputElement;
    this.errorMessage = document.getElementById('errorMessage') as HTMLDivElement;
    this.registerLink = document.querySelector('.login__register-link') as HTMLAnchorElement;
  }

  getEmailValue(): string {
    return this.emailInput.value.trim();
  }

  getPasswordValue(): string {
    return this.passwordInput.value.trim();
  }

  showError(message: string): void {
    this.errorMessage.textContent = message;
    this.errorMessage.style.display = 'block';
    this.errorMessage.classList.remove('login__error--shake');
    void this.errorMessage.offsetWidth;
    this.errorMessage.classList.add('login__error--shake');
  }

  hideError(): void {
    this.errorMessage.textContent = '';
    this.errorMessage.style.display = 'none';
  }

  bindSubmit(handler: (e: Event) => void): void {
    this.loginForm.addEventListener('submit', handler);
  }

  bindEnterKey(handler: () => void): void {
    this.emailInput.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handler();
      }
    });

    this.passwordInput.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handler();
      }
    });
  }

  redirectToGame(): void {
    window.location.href = '../Game/game.html';
  }
}

// ========== CONTROLLER ==========
class LoginController {
  private model: LoginModel;
  private view: LoginView;

  constructor(model: LoginModel, view: LoginView) {
    this.model = model;
    this.view = view;

    // Bind events
    this.view.bindSubmit(this.handleSubmit.bind(this));
    this.view.bindEnterKey(this.handleLogin.bind(this));
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();
    this.handleLogin();
  }

  private async handleLogin(): Promise<void> {
    // Hide previous errors
    this.view.hideError();

    // Get values from view
    const email = this.view.getEmailValue();
    const password = this.view.getPasswordValue();

    // Update model
    this.model.setEmail(email);
    this.model.setPassword(password);

    // Validate
    const validation = this.model.validateInputs();
    if (!validation.isValid) {
      this.view.showError(validation.error!);
      return;
    }

    // Attempt login
    const result = await this.model.login();

    if (result.ok) {
      // Success - redirect
      this.view.redirectToGame();
    } else {
      // Show error
      this.view.showError(result.error || 'Invalid email or password');
    }
  }
}

// ========== INITIALIZE APP ==========
const app = new LoginController(new LoginModel(), new LoginView());
