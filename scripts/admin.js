document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    
    // Force clear any stored values
    document.querySelector('#username').value = '';
    document.querySelector('#password').value = '';
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const credentials = {
            username: document.querySelector('#username').value.trim(),
            password: document.querySelector('#password').value.trim()
        };

        try {
            const response = await fetch('/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include'
            });

            if (response.ok) {
                window.location.replace('/admin-dashboard.html');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            alert('Login failed');
        }
    });
});