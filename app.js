const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const deviceController = require('./deviceController');

let app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.route('/fetch')
    .get(deviceController.fetchDevices);

app.route('/add')
    .post(deviceController.insertDevice);

app.route('/delete')
    .post(deviceController.deleteDevice);

module.exports = app;
