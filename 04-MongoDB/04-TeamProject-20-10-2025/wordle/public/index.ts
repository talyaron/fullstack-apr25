// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', (): void => {
    const links = document.querySelectorAll('.container__game a') as NodeListOf<HTMLAnchorElement>;

    // Add keyboard navigation
    addKeyboardNavigation(links);

    // Log game info
    console.log('🎮 Wordle Game Loaded! 🎮');
    console.log('Keyboard shortcuts: R - Register, L - Login');
});

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