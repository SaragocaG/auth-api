const knexfile = require('../knexfile');
const mysql = require('knex')(knexfile);

module.exports = mysql;
