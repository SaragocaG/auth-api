const express = require('express');

const routes = express.Router();
const authController = require('../controller/authController');

routes.use('/auth', authController);

module.exports = routes;
