const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db').pool; // Import the PostgreSQL connection

const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
    },
});

// Sync the model with the database
Blog.sync();

module.exports = Blog;
