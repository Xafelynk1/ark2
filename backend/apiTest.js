const axios = require('axios'); // Import axios for making HTTP requests

const testUserSignup = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/register', {
            username: 'testuser',
            password: 'testpassword'
        });
        console.log('Signup Response:', response.data);
    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error.message);
    }
};

const testUserSignin = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/signin', {
            username: 'testuser',
            password: 'testpassword'
        });
        console.log('Signin Response:', response.data);
    } catch (error) {
        console.error('Error during signin:', error.response ? error.response.data : error.message);
    }
};

// Run the tests
const runTests = async () => {
    await testUserSignup();
    await testUserSignin();
};

runTests();
