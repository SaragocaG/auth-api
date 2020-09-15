require('dotenv').config();
const express = require('express');
const router = require('./src/router');
const server = express();
const bodyParser = require('body-parser');
const port = process.env['AUTH_PORT'] || 3000;

server.use(router);
server.use(bodyParser.json());

server.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
