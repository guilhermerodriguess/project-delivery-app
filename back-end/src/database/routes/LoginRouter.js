const express = require('express');
const loginRouter = express.Router();
const AuthController = require('../controllers/AuthController');

const authController = new AuthController();

// Rota para autenticação de login
loginRouter.post('/', (req, res) => {
  authController.login(req, res);
});

module.exports = loginRouter;
