//challenge 1: text input
document.getElementById('name').addEventListener('input', function(e) {
    const output = document.getElementById('name-output');
    const name = e.target.value;
    output.textContent = name ? `Hello ${name}! 👋` : `Hello there! 👋`;
});

//Challenge 2: Number Input
document.getElementById('age')?.addEventListener('input', function(e) {
    const output = document.getElementById('age-output');
    const age = e.target.value;
    output.textContent = age ? `Your are ${age} years old! 🎂` : 'Age will appear here! 🎂';
});

//Challenge 3: Password Input
const PasswordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('show-password');
const passwordOutput = document.getElementById('password-output');

PasswordInput.addEventListener('input', function() {
    const isVisible = showPasswordCheckbox.checked;
    passwordOutput.textContent = this.value 
   ? `Password: ${isVisible ? this.value : '•'.repeat(this.value.length)} ${isVisible ? '👁️' : '🔒'}` 
   : 'Password: Hidden 🔒';
});

showPasswordCheckbox?.addEventListener('change', function() {
    PasswordInput?.dispatchEvent(new Event('input'));
})

// Challenge 4: Email Input
document.getElementById('email')?.addEventListener('input', function(e) {
 const output = document.getElementById('email-output');
 const email = e.target.value;
 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
 
 if (!email) {
    output?.textContent = 'Email will appear here! 📧';
    output?.className = 'output';
 } else if (emailPattern.test(email)) {
    output?.textContent = `Your email is ${email} ✅`;
    output?.className = 'output';
 } else {
    output?.textContent = 'Please enter a valid email format ❌';
    output?.className = 'output error';
 }
});
