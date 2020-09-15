const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.use('/auth', authController);

module.exports = router;
