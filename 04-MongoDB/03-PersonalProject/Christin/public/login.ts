// בדיקה אם המשתמש כבר מחובר
if (getToken()) {
    redirectToDashboard();
}

// המתן שה-DOM ייטען לפני הרצת הקוד
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm') as HTMLFormElement;

    if (!form) {
        console.error('Login form not found!');
        return;
    }

    form.addEventListener('submit', async (e: Event) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        if (!email || !password) {
            showMessage('אנא מלא את כל השדות', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        const originalText = submitBtn.textContent || '';
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> מתחבר...';

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                setAuthData(data.data.token, data.data.username, data.data.id);
                showMessage('התחברות בוצעה בהצלחה! מעביר ללוח הבקרה...', 'success');
                
                setTimeout(() => {
                    redirectToDashboard();
                }, 1500);
            } else {
                showMessage(data.message || 'שגיאה בהתחברות', 'error');
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
});