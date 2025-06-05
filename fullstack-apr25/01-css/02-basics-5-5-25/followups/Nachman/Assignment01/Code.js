// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const profileImage = document.getElementById('profile-image');
    const hobbyCards = document.querySelectorAll('.hobby-card');
    
    // Welcome message with small delay
    setTimeout(() => {
        showWelcomeMessage();
    }, 1000);
    
    // Profile image tilt effect
    profileImage.addEventListener('mousemove', function(e) {
        const bounds = this.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        const xRotation = 20 * ((mouseY - bounds.height / 2) / bounds.height);
        const yRotation = -20 * ((mouseX - bounds.width / 2) / bounds.width);
        
        this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
    });
    
    profileImage.addEventListener('mouseout', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
    
    // Add color changing effect for hobby cards
    hobbyCards.forEach(card => {
        card.addEventListener('click', function() {
            // Reset all cards
            hobbyCards.forEach(c => c.classList.remove('active'));
            
            // Activate clicked card
            this.classList.add('active');
            
            // Change icon color
            const icon = this.querySelector('.hobby-icon');
            icon.style.color = getRandomColor();
            
            // Animation effect
            this.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Functions
    function showWelcomeMessage() {
        const container = document.createElement('div');
        container.className = 'welcome-message';
        container.innerHTML = `
            <div class="welcome-content">
                <h3>Welcome to My Website!</h3>
                <p>Thanks for visiting my first web project.</p>
                <button id="close-welcome">Got it!</button>
            </div>
        `;
        
        // Add styles for welcome message
        const style = document.createElement('style');
        style.textContent = `
            .welcome-message {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: a10px;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
                padding: 20px;
                z-index: 1000;
                animation: slideIn 0.5s forwards;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .welcome-content h3 {
                color: #2575fc;
                margin-bottom: 10px;
            }
            
            .welcome-content p {
                margin-bottom: 15px;
            }
            
            #close-welcome {
                background: #6a11cb;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            #close-welcome:hover {
                background: #2575fc;
            }
            
            .hobby-card.active {
                border: 2px solid #2575fc;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(container);
        
        // Add close functionality
        document.getElementById('close-welcome').addEventListener('click', function() {
            container.style.animation = 'slideOut 0.5s forwards';
            
            const slideOut = document.createElement('style');
            slideOut.textContent = `
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(slideOut);
            
            setTimeout(() => {
                container.remove();
            }, 500);
        });
    }
    // This will trigger when the document has loaded
document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('myImage');
    
    // Example: Add a click event to the image
    image.addEventListener('click', function() {
      alert('Image clicked!');
      // You could also change the image source
      // image.src = './Media/different-image.jpg';
    });
  });
    
    function getRandomColor() {
        const colors = [
            '#2575fc', '#6a11cb', '#fd746c', '#ff9068', 
            '#00b09b', '#96c93d', '#a8ff78', '#78ffd6'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});