const request = require('supertest');
const app = require('../../backend/server');
const db = require('../../backend/config/db');

describe('User Controller', () => {
    beforeEach(async () => {
        await db.query('DELETE FROM users'); // Clear the users table before each test
    });


    afterAll(async () => {
        await db.pool.end(); // Close the database connection after tests
    }, 15000); // Increase timeout to 15 seconds


    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });


    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.username).toBe('testuser');
    });

    it('should fail to login with incorrect credentials', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
