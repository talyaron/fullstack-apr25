// ====== port =======


// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', (): void => {
    // Check if user is already logged in
    if (isUserLoggedIn()) {
        console.log('🎮 User already logged in! Redirecting to game... 🎮');
        window.location.href = './Game/game.html';
        return; // Stop execution to prevent showing login page
    }

    const links = document.querySelectorAll('.container__game a') as NodeListOf<HTMLAnchorElement>;

    // Add keyboard navigation
    addKeyboardNavigation(links);

    // Log game info
    console.log('🎮 Wordle Game Loaded! 🎮');
    console.log('Keyboard shortcuts: R - Register, L - Login');
});

// Check if user has a valid login cookie
function isUserLoggedIn(): boolean {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        // Check for your specific cookie name (adjust 'userToken' to match your actual cookie name)
        if (name === 'token' && value) {
            return true;
        }
    }

    return false;
}

// Add keyboard navigation
function addKeyboardNavigation(links: NodeListOf<HTMLAnchorElement>): void {
    document.addEventListener('keydown', (e: KeyboardEvent): void => {
        // Press 'R' for Register
        if (e.key.toLowerCase() === 'r') {
            e.preventDefault();
            links[0]?.click();
        }

        // Press 'L' for Login
        if (e.key.toLowerCase() === 'l') {
            e.preventDefault();
            links[1]?.click();
        }
    });
}
