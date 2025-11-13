(() => {
    "use strict";
    try {
        const ball = document.querySelector('#ball');

        if (!ball) {
            throw new Error('Ball element not found');
        }
        ball.addEventListener('animationend', (e) => {
            const animationEvent = e as AnimationEvent;
            console.log('Animation ended:', animationEvent);
            ball.classList.add('fade-out');
            ball.addEventListener('transitionend', () => {
                console.log('Fade out transition ended');
                ball.remove();
            });
        });
    } catch (error) {
        console.error('Error in animation script:', error);
    }
})()