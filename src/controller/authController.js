const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../model/User');
const mandatoryFields = require('../middleware/mandatoryFields');

const authController = express.Router();

const signupMandatoryFields = ['name', 'email', 'password'];
authController.post('/signup', mandatoryFields(signupMandatoryFields), async (req, res) => {
  const { email, name, password } = req.body;
  const user = new User({ email, name, password });
  user.create()
    .then(() => {
      res.status(201).json({
        code: 201,
        message: 'usuário criado com sucesso',
      });
    })
    .catch((err) => {
      console.log(err, 'erro');
      res.status(500).json({
        code: 500,
        message: err,
      });
    });
});

const loginMandatoryFields = ['email', 'password'];
authController.post('/login', mandatoryFields(loginMandatoryFields), (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email });
  let scopes = [];

  const badCredentials = () => {
    res.status(401).json({
      code: 401,
      message: 'email ou senha incorretos',
    });
  };

  user.getByEmail(email)
    .then(async () => {
      if (user.id) {
        scopes = await user.getScopes();
        if (bcrypt.compareSync(password, user.password)) {
          const now = Math.floor(Date.now() / 1000);
          const payload = {
            id: user.id,
            scopes: scopes.map((item) => item.scope),
            exp: now + (60 * 60 * 24 * 1),
          };
          res.status(200).json({
            ...payload,
            token: jwt.sign(payload, process.env.AUTH_SECRET),
          });
        } else {
          badCredentials();
        }
      } else {
        badCredentials();
        /*
          dont return a 404 HTTP Response status
          otherwise the endpoint would become a
          "suchEmailIsRegistered(email)" public query.
        */
      }
    })
    .catch((err) => {
      res.status(500).json({
        code: 500,
        message: err,
      });
    });
});

module.exports = authController;
