import { showMessage, getToken, setAuthData, redirectToDashboard } from './utils.js';

// בדיקה אם המשתמש כבר מחובר
if (getToken()) {
    redirectToDashboard();
}

const form = document.getElementById('registerForm') as HTMLFormElement;

form.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
    
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // ולידציה
    if (!username || !email || !password || !confirmPassword) {
        showMessage('אנא מלא את כל השדות', 'error');
        return;
    }
    
    if (username.length < 3) {
        showMessage('שם משתמש חייב להכיל לפחות 3 תווים', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('סיסמה חייבת להכיל לפחות 6 תווים', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('הסיסמאות אינן תואמות', 'error');
        return;
    }
    
    // בדיקת פורמט אימייל
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        showMessage('אנא הזן כתובת אימייל תקינה', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitBtn.textContent || '';
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> נרשם...';

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (data.success) {
            setAuthData(data.data.token, data.data.username, data.data.id);
            showMessage('הרשמה בוצעה בהצלחה! מעביר ללוח הבקרה...', 'success');
            
            setTimeout(() => {
                redirectToDashboard();
            }, 1500);
        } else {
            showMessage(data.message || 'שגיאה בהרשמה', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('שגיאה בהתחברות לשרת. אנא נסה שוב.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});