
interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface ApiResponse {
    error?: string;
    message?: string;
}

document.addEventListener('DOMContentLoaded', (): void => {
    const registerForm = document.getElementById('registerForm') as HTMLFormElement;
    const errorDiv = document.getElementById('error') as HTMLDivElement;
    const successDiv = document.getElementById('success') as HTMLDivElement;
    const loadingDiv = document.getElementById('loading') as HTMLDivElement;
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

    registerForm.addEventListener('submit', async (e: Event): Promise<void> => {
        e.preventDefault();

        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';

        const user = (document.getElementById('user') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

        if (!user || !email || !password || !confirmPassword) {
            errorDiv.textContent = 'Please fill in all fields';
            errorDiv.style.display = 'block';
            return;
        }

        if (password !== confirmPassword) {
            errorDiv.textContent = 'Passwords do not match';
            errorDiv.style.display = 'block';
            return;
        }

        submitBtn.style.display = 'none';
        loadingDiv.style.display = 'block';

        try {
            const response = await fetch("http://localhost:3000/user/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: user,
                    email,
                    password
                } as RegisterData)
            });

            const data: ApiResponse = await response.json();

            submitBtn.style.display = 'block';
            loadingDiv.style.display = 'none';

            if (response.ok) {
                successDiv.textContent = 'Registration successful! Redirecting to login...';
                successDiv.style.display = 'block';

                registerForm.reset();

                setTimeout((): void => {
                    window.location.href = '../login/login.html';
                }, 2000);
            } else {
                errorDiv.textContent = data.error || 'Registration failed';
                errorDiv.style.display = 'block';
            }
        } catch (error) {
            submitBtn.style.display = 'block';
            loadingDiv.style.display = 'none';

            errorDiv.textContent = 'Network error. Please try again.';
            errorDiv.style.display = 'block';
            console.error('Registration error:', error);
        }
    });

    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;

    function validatePasswordMatch(): void {
        if (confirmPasswordInput.value && passwordInput.value) {
            if (passwordInput.value === confirmPasswordInput.value) {
                confirmPasswordInput.style.borderColor = '#27ae60';
            } else {
                confirmPasswordInput.style.borderColor = '#e74c3c';
            }
        } else {
            confirmPasswordInput.style.borderColor = '#e1e1e1';
        }
    }

    passwordInput.addEventListener('input', validatePasswordMatch);
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);

    const userInput = document.getElementById('user') as HTMLInputElement; // Changed from 'name' to 'user'
    const emailInput = document.getElementById('email') as HTMLInputElement;

    userInput.addEventListener('input', (): void => {
        if (userInput.value.trim().length >= 2) {
            userInput.style.borderColor = '#27ae60';
        } else if (userInput.value.length > 0) {
            userInput.style.borderColor = '#e74c3c';
        } else {
            userInput.style.borderColor = '#e1e1e1';
        }
    });

    emailInput.addEventListener('input', (): void => {
        if (emailInput.validity.valid) {
            emailInput.style.borderColor = '#27ae60';
        } else if (emailInput.value.length > 0) {
            emailInput.style.borderColor = '#e74c3c';
        } else {
            emailInput.style.borderColor = '#e1e1e1';
        }
    });

    passwordInput.addEventListener('input', (): void => {
        if (passwordInput.value.length > 0) {
            passwordInput.style.borderColor = '#27ae60';
        } else {
            passwordInput.style.borderColor = '#e1e1e1';
        }
    });

    [userInput, emailInput, passwordInput, confirmPasswordInput].forEach((input: HTMLInputElement): void => {
        input.addEventListener('blur', (): void => {
            if (!input.value) {
                input.style.borderColor = '#e1e1e1';
            }
        });
    });
});
