const express = require('express');

const authController = express.Router();
const mandatoryFields = require('../middleware/mandatoryFields');

const getUserByEmail = () => {

};

authController.post('/', mandatoryFields(['email', 'password']), (req, res) => {
  
});

module.exports = authController;
