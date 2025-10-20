document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.getElementById('error');
    const successDiv = document.getElementById('success');
    const loadingDiv = document.getElementById('loading');
    const submitBtn = document.getElementById('submitBtn');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous messages
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';

        // Get form data
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validate inputs
        if (!email || !password) {
            errorDiv.textContent = 'Please fill in all fields';
            errorDiv.style.display = 'block';
            return;
        }

        // Show loading state
        submitBtn.style.display = 'none';
        loadingDiv.style.display = 'block';

        try {
            // Send login request
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Important for cookies
                body: JSON.stringify({
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
                successDiv.textContent = 'Login successful! Redirecting...';
                successDiv.style.display = 'block';

                // Store user info in localStorage (optional)
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }

                // Redirect to index.html after a short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // Show error message
                errorDiv.textContent = data.error || 'Login failed';
                errorDiv.style.display = 'block';
            }
        } catch (error) {
            // Hide loading state
            submitBtn.style.display = 'block';
            loadingDiv.style.display = 'none';

            // Show error message
            errorDiv.textContent = 'Network error. Please try again.';
            errorDiv.style.display = 'block';
            console.error('Login error:', error);
        }
    });

    // Add input validation feedback
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    emailInput.addEventListener('input', () => {
        if (emailInput.validity.valid) {
            emailInput.style.borderColor = '#27ae60';
        } else {
            emailInput.style.borderColor = '#e74c3c';
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
    emailInput.addEventListener('blur', () => {
        if (!emailInput.value) {
            emailInput.style.borderColor = '#e1e1e1';
        }
    });

    passwordInput.addEventListener('blur', () => {
        if (!passwordInput.value) {
            passwordInput.style.borderColor = '#e1e1e1';
        }
    });
});