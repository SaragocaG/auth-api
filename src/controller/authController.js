const express = require('express');

const authController = express.Router();
const mandatoryFields = require('../middleware/mandatoryFields');

const getUserByEmail = () => {

};

authController.post('/', (req, res) => {
  
});

module.exports = authController;
