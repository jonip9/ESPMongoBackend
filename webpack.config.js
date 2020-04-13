const path = require('path');

module.exports = {
    entry: './bin/index',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};