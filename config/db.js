const Datastore = require('nedb');
const db = new Datastore({ filename: 'db.json', autoload: true });

// Indexing
db.ensureIndex({ fieldName: 'userId' }, (err) => {
    if (err) console.error('Error creating index on userId:', err);
});
db.ensureIndex({ fieldName: 'transactionId' }, (err) => {
    if (err) console.error('Error creating index on transactionId:', err);
});

// Data Cleanup Function
const cleanupOldData = () => {
    const expirationTime = 30 * 24 * 60 * 60 * 1000; // 30 days
    const cutoffDate = Date.now() - expirationTime;

    db.remove({ createdAt: { $lt: cutoffDate } }, { multi: true }, (err, numRemoved) => {
        if (err) {
            console.error('Error cleaning up old data:', err);
        } else {
            console.log(`${numRemoved} old records removed.`);
        }
    });
};

// Schedule cleanup to run daily
setInterval(cleanupOldData, 24 * 60 * 60 * 1000); // Every 24 hours

module.exports = db;
