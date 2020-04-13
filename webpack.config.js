const path = require('path');

module.exports = {
    entry: './bin/www',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};