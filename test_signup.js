const fetch = require('node-fetch');

const signupData = {
    email: "test@example.com",
    password: "password123",
    name: "Test",
    surname: "User",
    age: 30
};

fetch('http://localhost:5000/api/admin/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupData),
})
.then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Network response was not ok.');
})
.then(data => {
    console.log('Signup successful:', data);
})
.catch(error => {
    console.error('Error during signup:', error);
});
