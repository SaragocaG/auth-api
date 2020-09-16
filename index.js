require('dotenv').config();

const port = process.env['AUTH_PORT'] || 3000;
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const express = require('express');
const hasScope = require('./src/middleware/hasScope');

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(routes);

server.get('/example', hasScope('read:example'), (req, res) => {
  res.json({
    code: 200,
    message: 'se você vê essa mensagem, você está autenticado e autorizado'
  })
})

server.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
