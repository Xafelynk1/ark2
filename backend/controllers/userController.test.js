const request = require('supertest');
const app = require('../server'); // Import the app instance directly
let server; // Declare a variable to hold the server instance

beforeAll(() => {
    server = app.listen(0); // Use a random available port
});

afterAll(async () => {
    await db.remove({}, { multi: true }); // Clean up the database after tests
    server.close(); // Ensure the server shuts down
});
const db = require('../config/db'); // Import the database instance
// jest.mock('medb-admin/app', () => ({
//     initializeApp: jest.fn().mockReturnValue({}),
//     cert: jest.fn().mockReturnValue({}),
// }));

describe('User Controller', () => {
    afterAll(async () => {
        await db.remove({}, { multi: true }); // Clean up the database after tests
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register') // Adjust the endpoint as necessary
            .send({ username: 'testuser', password: 'testpassword' });
        
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should log in a user', async () => {
        await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', password: 'testpassword' });

        const response = await request(app)
            .post('/api/users/login') // Adjust the endpoint as necessary
            .send({ username: 'testuser', password: 'testpassword' });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    // Add more tests for other user functionalities...
});
