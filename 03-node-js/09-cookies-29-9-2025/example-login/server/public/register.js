document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const errorDiv = document.getElementById('error');
    const successDiv = document.getElementById('success');
    const loadingDiv = document.getElementById('loading');
    const submitBtn = document.getElementById('submitBtn');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous messages
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
            errorDiv.textContent = 'Please fill in all fields';
            errorDiv.style.display = 'block';
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            errorDiv.textContent = 'Passwords do not match';
            errorDiv.style.display = 'block';
            return;
        }


        // Show loading state
        submitBtn.style.display = 'none';
        loadingDiv.style.display = 'block';

        try {
            // Send register request
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Important for cookies
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            // Hide loading state
            submitBtn.style.display = 'block';
            loadingDiv.style.display = 'none';

            if (response.ok) {
                // Show success message
                successDiv.textContent = 'Registration successful! Redirecting to login...';
                successDiv.style.display = 'block';

                // Clear form
                registerForm.reset();

                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                // Show error message
                errorDiv.textContent = data.error || 'Registration failed';
                errorDiv.style.display = 'block';
            }
        } catch (error) {
            // Hide loading state
            submitBtn.style.display = 'block';
            loadingDiv.style.display = 'none';

            // Show error message
            errorDiv.textContent = 'Network error. Please try again.';
            errorDiv.style.display = 'block';
            console.error('Registration error:', error);
        }
    });

    // Add real-time password match validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    function validatePasswordMatch() {
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

    // Add input validation feedback
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length >= 2) {
            nameInput.style.borderColor = '#27ae60';
        } else if (nameInput.value.length > 0) {
            nameInput.style.borderColor = '#e74c3c';
        } else {
            nameInput.style.borderColor = '#e1e1e1';
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.validity.valid) {
            emailInput.style.borderColor = '#27ae60';
        } else if (emailInput.value.length > 0) {
            emailInput.style.borderColor = '#e74c3c';
        } else {
            emailInput.style.borderColor = '#e1e1e1';
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length > 0) {
            passwordInput.style.borderColor = '#27ae60';
        } else {
            passwordInput.style.borderColor = '#e1e1e1';
        }
    });

    // Clear border colors on blur if empty
    [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.style.borderColor = '#e1e1e1';
            }
        });
    });
});