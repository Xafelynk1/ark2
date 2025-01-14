require('dotenv').config({ path: './backend/.env' }); // Load environment variables from .env file

const express = require('express');

const session = require('express-session');
const sessionSecret = process.env.SESSION_SECRET || 'your_default_secret'; // Add session secret
const cors = require('cors');
const admin = require('./config/medb-config');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const db = require('./config/db'); // Import PostgreSQL connection

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Log the DATABASE_URL for debugging

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Establish PostgreSQL connection
db.pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5035; // Set default port if not defined
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app; // Export app for testing
