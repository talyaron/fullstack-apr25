// Types
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  addedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  cart: CartItem[];
  createdAt: string;
  lastLogin?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

interface PasswordStrength {
  level: 'weak' | 'medium' | 'strong';
  text: string;
}

document.addEventListener('DOMContentLoaded', function(): void {
    const loginForm = document.getElementById('loginForm') as HTMLFormElement | null;
    const registerForm = document.getElementById('registerForm') as HTMLFormElement | null;
    const authContainer = document.getElementById('authContainer') as HTMLElement | null;
    const dashboard = document.getElementById('dashboard') as HTMLElement | null;
    const showRegisterBtn = document.getElementById('showRegister') as HTMLButtonElement | null;
    const showLoginBtn = document.getElementById('showLogin') as HTMLButtonElement | null;
    const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement | null;
    const errorMessage = document.getElementById('errorMessage') as HTMLElement | null;
    const successMessage = document.getElementById('successMessage') as HTMLElement | null;

    // Check if user is already logged in
    const token: string | null = localStorage.getItem('token');
    if (token) {
        checkAuthStatus(token);
    }

    // Form switching
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', function(e: Event): void {
            e.preventDefault();
            showRegisterForm();
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function(e: Event): void {
            e.preventDefault();
            showLoginForm();
        });
    }

    function showRegisterForm(): void {
        if (loginForm) loginForm.classList.remove('form--active');
        if (registerForm) registerForm.classList.add('form--active');
        clearMessages();
    }

    function showLoginForm(): void {
        if (registerForm) registerForm.classList.remove('form--active');
        if (loginForm) loginForm.classList.add('form--active');
        clearMessages();
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e: Event): Promise<void> {
            e.preventDefault();
            clearMessages();

            const emailInput = document.getElementById('loginEmail') as HTMLInputElement;
            const passwordInput = document.getElementById('loginPassword') as HTMLInputElement;

            if (!emailInput || !passwordInput) return;

            const email: string = emailInput.value;
            const password: string = passwordInput.value;

            try {
                const response: Response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data: AuthResponse = await response.json();

                if (data.success && data.token) {
                    localStorage.setItem('token', data.token);
                    showSuccessMessage('Login successful! Redirecting to store...');
                    
                    setTimeout((): void => {
                        window.location.href = '../public/';
                    }, 1500);
                } else {
                    showErrorMessage(data.message);
                }
            } catch (error: any) {
                console.error('Login error:', error);
                showErrorMessage('Network error. Please try again.');
            }
        });
    }

    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e: Event): Promise<void> {
            e.preventDefault();
            clearMessages();

            const nameInput = document.getElementById('registerName') as HTMLInputElement;
            const emailInput = document.getElementById('registerEmail') as HTMLInputElement;
            const passwordInput = document.getElementById('registerPassword') as HTMLInputElement;
            const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;

            if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) return;

            const name: string = nameInput.value;
            const email: string = emailInput.value;
            const password: string = passwordInput.value;
            const confirmPassword: string = confirmPasswordInput.value;

            // Client-side validation
            if (!name.trim()) {
                showErrorMessage('Name is required');
                return;
            }

            if (!isValidEmail(email)) {
                showErrorMessage('Please enter a valid email address');
                return;
            }

            if (password.length < 6) {
                showErrorMessage('Password must be at least 6 characters');
                return;
            }

            if (password !== confirmPassword) {
                showErrorMessage('Passwords do not match');
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

                if (data.success && data.token) {
                    localStorage.setItem('token', data.token);
                    showSuccessMessage('Account created successfully! Redirecting to store...');
                    
                    setTimeout((): void => {
                        window.location.href = '../public/';
                    }, 1500);
                } else {
                    showErrorMessage(data.message);
                }
            } catch (error: any) {
                console.error('Register error:', error);
                showErrorMessage('Network error. Please try again.');
            }
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(): void {
            localStorage.removeItem('token');
            showAuthForms();
            clearMessages();
            showSuccessMessage('Logged out successfully');
        });
    }

    // Check auth status
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
        } catch (error: any) {
            console.error('Auth check error:', error);
            localStorage.removeItem('token');
            showAuthForms();
        }
    }

    // Show dashboard
    function showDashboard(user: User): void {
        if (authContainer) {
            authContainer.style.display = 'none';
        }
        if (dashboard) {
            dashboard.style.display = 'block';
            
            // Update user information
            const userNameEl = document.getElementById('userName') as HTMLElement | null;
            const userEmailEl = document.getElementById('userEmail') as HTMLElement | null;
            const userDateEl = document.getElementById('userDate') as HTMLElement | null;
            const lastLoginEl = document.getElementById('lastLogin') as HTMLElement | null;

            if (userNameEl) userNameEl.textContent = user.name;
            if (userEmailEl) userEmailEl.textContent = user.email;
            if (userDateEl) userDateEl.textContent = new Date(user.createdAt).toLocaleDateString();
            if (lastLoginEl) {
                lastLoginEl.textContent = user.lastLogin ? 
                    new Date(user.lastLogin).toLocaleString() : 'First login';
            }
        }
    }

    // Show auth forms
    function showAuthForms(): void {
        if (authContainer) {
            authContainer.style.display = 'block';
        }
        if (dashboard) {
            dashboard.style.display = 'none';
        }
        showLoginForm();
    }

    // Show error message
    function showErrorMessage(message: string): void {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
        if (successMessage) {
            successMessage.style.display = 'none';
        }
        
        setTimeout((): void => {
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        }, 5000);
    }

    // Show success message
    function showSuccessMessage(message: string): void {
        if (successMessage) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
        }
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
        
        setTimeout((): void => {
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 5000);
    }

    // Clear messages
    function clearMessages(): void {
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }

    // Email validation
    function isValidEmail(email: string): boolean {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password strength checker
    const passwordInput = document.getElementById('registerPassword') as HTMLInputElement | null;
    const strengthDiv = document.getElementById('passwordStrength') as HTMLElement | null;

    if (passwordInput && strengthDiv) {
        passwordInput.addEventListener('input', function(): void {
            const password: string = (this as HTMLInputElement).value;
            const strength: PasswordStrength = checkPasswordStrength(password);
            strengthDiv.textContent = strength.text;
            strengthDiv.className = `form-group__helper strength-${strength.level}`;
        });
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
});