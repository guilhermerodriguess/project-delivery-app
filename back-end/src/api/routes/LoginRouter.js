const express = require('express');

const loginRouter = express.Router();
const loginController = require('../controllers/LoginController');

// Rota para autenticação de login
loginRouter.post('/', (req, res) => {
  loginController.login(req, res);
});

module.exports = loginRouter;
