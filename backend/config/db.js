const { Pool } = require('pg');
require('dotenv').config();

// Use Railway's PostgreSQL connection string
const connectionString = process.env.DATABASE_URL;

console.log('DATABASE_URL:', connectionString); // Log the DATABASE_URL for debugging
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

// Create the users table if it doesn't exist
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )
`).catch(err => console.error('Error creating users table:', err));

// Function to query the database
const query = (text, params) => pool.query(text, params);

// Test database connection
const testConnection = async () => {
    try {
        const res = await query('SELECT NOW()');
        console.log('Database connection successful:', res.rows[0]);
        return true;
    } catch (err) {
        console.error('Database connection error:', err);
        return false;
    }
};

module.exports = {
    query,
    pool,
    testConnection
};
