const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db').pool; // Import the PostgreSQL connection

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
    walletBalance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
});

// Sync the model with the database
User.sync();

module.exports = User;
