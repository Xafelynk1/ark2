const { Pool } = require('pg');
require('dotenv').config();

// Use Railway's PostgreSQL connection string
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

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
