// הצהרת הפונקציות
function showMessage(text: string, type: 'error' | 'success' | 'info'): void {
    const messageDiv = document.getElementById('message') as HTMLDivElement;
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function getToken(): string | null {
    return localStorage.getItem('token');
}

function setAuthData(token: string, username: string, userId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
}

function clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
}

function redirectToDashboard(): void {
    window.location.href = '/dashboard';
}

function redirectToLogin(): void {
    window.location.href = '/login';
}

// הפיכת הפונקציות לגלובליות
(window as any).showMessage = showMessage;
(window as any).getToken = getToken;
(window as any).setAuthData = setAuthData;
(window as any).clearAuthData = clearAuthData;
(window as any).redirectToDashboard = redirectToDashboard;
(window as any).redirectToLogin = redirectToLogin;

// לוג לוודא שהכל נטען
console.log('✅ utils.js נטען בהצלחה');