const express = require('express');
const router = express.Router();

// Sample data for activity logs
const activityLogs = [
    { id: 1, action: 'User signed in', timestamp: '2023-10-01T12:00:00Z' },
    { id: 2, action: 'User created a new quiz', timestamp: '2023-10-01T12:05:00Z' },
    { id: 3, action: 'User signed out', timestamp: '2023-10-01T12:10:00Z' },
];

// Route to get activity logs
router.get('/', (req, res) => {
    res.json(activityLogs);
});

module.exports = router;
