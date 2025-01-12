module.exports = {
    testEnvironment: 'node',
    detectOpenHandles: true,
    transform: {
        '^.+\\.js$': 'babel-jest', // Use Babel to transform JavaScript files
    },
    transformIgnorePatterns: [
        "/node_modules/(?!lowdb)" // Allow transformation of lowdb module
    ],
};
