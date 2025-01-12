module.exports = {
    files: ["**/*.js"], // Include all JavaScript files
    ignores: ["node_modules"], // Ignore node_modules
    linterOptions: {
        env: {
            browser: true,
            es2021: true,
            node: true,
        },
        extends: "eslint:recommended",
        parserOptions: {
            ecmaVersion: 12,
            sourceType: "module",
        },
        rules: {
            // Add custom rules if needed
        },
    },
};
