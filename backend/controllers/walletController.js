const db = require('../config/db'); // Assuming Medb is set up in db.js

exports.creditWallet = async (req, res) => {
    const { userId, amount } = req.body;
    const wallet = await db.wallets.findOne({ userId });
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
    }
    wallet.balance += amount;
    await db.wallets.update({ userId }, { balance: wallet.balance });
    res.status(200).json(wallet);
};

exports.deductWallet = async (req, res) => {
    const { userId, amount } = req.body;
    const wallet = await db.wallets.findOne({ userId });
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
    }
    wallet.balance -= amount;
    await db.wallets.update({ userId }, { balance: wallet.balance });
    res.status(200).json(wallet);
};

exports.createWallet = async (req, res) => {
    const { userId } = req.body;
    const walletData = { userId, balance: 0 };
    await db.wallets.insert(walletData); // Updated to use Medb
    res.status(201).json(walletData);
};

exports.getWalletDetails = async (req, res) => {
    const wallet = await db.wallets.findOne({ userId: req.user.id });
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
    }
    res.status(200).json(wallet);
};

exports.updateWallet = async (req, res) => {
    const { userId, balance } = req.body;
    const wallet = await db.wallets.findOne({ userId });
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
    }
    await db.wallets.update({ userId }, { balance });
    res.status(200).json({ userId, balance });
};

exports.deleteWallet = async (req, res) => {
    const { userId } = req.body;
    const wallet = await db.wallets.findOne({ userId });
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
    }
    await db.wallets.remove({ userId });
    res.status(204).send();
};

exports.getWalletBalance = async (req, res) => {
    const wallet = await db.wallets.findOne({ userId: req.user.id });
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
    }
    res.status(200).json({ balance: wallet.balance });
};
