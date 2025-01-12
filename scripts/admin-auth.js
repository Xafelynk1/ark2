document.getElementById('admin-login').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            credentials: 'same-origin'
        });

        if (response.ok) {
            window.location.href = '/admin-dashboard.html';
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        alert('Login failed. Please try again.');
    }
});
