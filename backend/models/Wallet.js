const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db').pool; // Import the PostgreSQL connection

const Wallet = sequelize.define('Wallet', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
});

// Sync the model with the database
Wallet.sync();

module.exports = {
    createWallet: async (walletData) => {
        const wallet = await Wallet.create(walletData); // Use Sequelize to insert wallet data
        return wallet.id; // Return the ID of the created wallet
    },
    // Additional methods can be added here
};
