const request = require('supertest');
const app = require('../server'); // Assuming your Express app is exported from server.js
const db = require('../config/db'); // Import the database instance
let server; // Declare a variable to hold the server instance

beforeAll(() => {
    server = app.listen(0); // Use a random available port
});

afterAll(async () => {
    await db.remove({}, { multi: true }); // Clean up the database after tests
    server.close(); // Ensure the server shuts down
});

describe('Blog Controller', () => {
    // Removed redundant cleanup logic

    it('should create a new blog', async () => {
        const response = await request(app)
            .post('/api/blogs') // Adjust the endpoint as necessary
            .send({ title: 'Test Blog', content: 'This is a test blog content.' });
        
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Blog');
    });

    it('should retrieve all blogs', async () => {
        const response = await request(app)
            .get('/api/blogs'); // Adjust the endpoint as necessary
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Add more tests for other blog functionalities...
});
