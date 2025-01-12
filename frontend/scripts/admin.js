document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('adminLoginForm');
    const usernameInput = document.getElementById('adminUsername');
    const passwordInput = document.getElementById('adminPassword');

    // Clear form on page load
    form.reset();
    usernameInput.value = '';
    passwordInput.value = '';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const credentials = {
            username: usernameInput.value.trim(),
            password: passwordInput.value.trim()
        };

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = '/admin-dashboard.html';
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    });
});
