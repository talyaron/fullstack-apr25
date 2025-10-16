// פונקציות עזר משותפות

export function showMessage(text: string, type: 'error' | 'success' | 'info'): void {
    const messageDiv = document.getElementById('message') as HTMLDivElement;
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

export function getToken(): string | null {
    return localStorage.getItem('token');
}

export function setAuthData(token: string, username: string, userId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
}

export function clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
}

export function redirectToDashboard(): void {
    window.location.href = '/dashboard';
}

export function redirectToLogin(): void {
    window.location.href = '/login';
}