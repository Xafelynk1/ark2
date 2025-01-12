module.exports = {
    presets: [
        '@babel/preset-env', // Use the preset for transforming ES modules
    ],
    plugins: [
        '@babel/plugin-transform-modules-commonjs' // Transform ES modules to CommonJS
    ]
};
