const bcrypt = require('bcrypt'); // Import bcrypt
const fs = require('fs'); // Import fs for file system operations
const jwt = require('jsonwebtoken'); // Import jwt for token generation
const dbFile = './db.json'; // Path to the database file

// Ensure the database file exists
if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, '{}'); // Create an empty JSON file
}
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(dbFile);
const db = low(adapter);
db.defaults({ users: [] }).write(); // Ensure users array exists

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { username, password: hashedPassword };
        const existingData = db.get('users').value();

        console.log('Existing data before registration:', existingData);
        const users = existingData || []; // Directly use existingData as an array

        users.push(user);
        db.set('users', users).write(); // Update the users array in the database

        console.log('Database after insertion:', db.get('users').value()); // Log database state
        res.status(201).json({ message: 'User registered successfully', user: { username } });
    } catch (error) {
        console.error('Registration error:', error.stack);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        console.log('Login attempt for username:', username);
        const users = db.get('users').value();
        console.log('Users found:', users);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Get the user profile
exports.getUserProfile = async (req, res) => {
    const { username } = req.body;

    try {
        const users = db.get('users').value();
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
        return res.status(400).json({ message: 'Username and new password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const users = db.get('users').value();
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = hashedPassword;
        db.set('users', users).write(); // Update the users array in the database
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    const { username, newData } = req.body;

    if (!username || !newData) {
        return res.status(400).json({ message: 'Username and new data are required' });
    }

    try {
        const users = db.get('users').value();
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        Object.assign(user, newData); // Update user data
        db.set('users', users).write(); // Update the users array in the database
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const users = db.get('users').value();
        const userIndex = users.findIndex(u => u.username === username);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }
        users.splice(userIndex, 1); // Remove user from array
        db.set('users', users).write(); // Update the users array in the database
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// List Users
exports.listUsers = async (req, res) => {
    try {
        const users = db.get('users').value();
        console.log('Fetched users:', users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
