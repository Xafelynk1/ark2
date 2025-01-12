const request = require('supertest');
const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Adjust the path as necessary
// jest.mock('medb-admin/app', () => ({
//     initializeApp: jest.fn().mockReturnValue({}),
//     cert: jest.fn().mockReturnValue({}),
// }));
const medbConfig = require('./config/medb-config'); // Adjust the path as necessary

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes); // Mount the user routes

describe('User Routes', () => {
    it('should reset password', async () => {
        const response = await request(app)
            .post('/api/users/reset-password')
            .send({ username: 'testuser', newPassword: 'newpassword123' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Password reset successfully');
    });

    it('should update user', async () => {
        const response = await request(app)
            .put('/api/users/update-user')
            .send({ username: 'testuser', newData: { email: 'newemail@example.com' } });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User updated successfully');
    });

    it('should delete user', async () => {
        const response = await request(app)
            .delete('/api/users/delete-user')
            .send({ username: 'testuser' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
    });

    it('should list users', async () => {
        const response = await request(app)
            .get('/api/users/list-users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
