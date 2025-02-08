const request = require('supertest');
const app = require('../../backend/server');
const db = require('../../backend/config/db');

describe('Blog Controller', () => {
    beforeEach(async () => {
        await db.query('DELETE FROM blogs'); // Clear the blogs table before each test
    });

    afterAll(async () => {
        await db.pool.end(); // Close the database connection after tests
    }, 15000); // Increase timeout to 15 seconds

    it('should create a new blog', async () => {
        const response = await request(app)
            .post('/api/blogs')
            .send({ title: 'Test Blog', content: 'This is a test blog content.' });

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Blog');
    });

    it('should retrieve all blogs', async () => {
        // First, create a blog
        await request(app)
            .post('/api/blogs')
            .send({ title: 'Test Blog', content: 'This is a test blog content.' });

        // Then, retrieve all blogs
        const response = await request(app)
            .get('/api/blogs');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
