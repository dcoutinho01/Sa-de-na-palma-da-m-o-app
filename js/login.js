document.addEventListener('DOMContentLoaded', () => {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.querySelector('i').classList.toggle('fa-eye');
        togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Form submission
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const remember = document.querySelector('#remember').checked;
        
        // Here you would typically handle the login logic
        console.log('Login attempt:', { email, password, remember });
        
        // For demo purposes, redirect to index.html after 1 second
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
    
    // Social login handlers
    document.querySelector('.google').addEventListener('click', () => {
        console.log('Google login clicked');
        // Implement Google login
    });
    
    document.querySelector('.apple').addEventListener('click', () => {
        console.log('Apple login clicked');
        // Implement Apple login
    });
});