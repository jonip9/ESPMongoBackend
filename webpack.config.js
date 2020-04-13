const path = require('path');

module.exports = {
    entry: './bin/www.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};