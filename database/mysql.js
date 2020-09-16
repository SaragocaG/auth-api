const knex = require('knex');
const knexfile = require('../knexfile');

const mysql = knex(knexfile);

module.exports = mysql;
