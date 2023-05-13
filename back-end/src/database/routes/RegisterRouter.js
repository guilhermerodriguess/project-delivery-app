const express = require('express');
const registerRouter = express.Router();
const AuthController = require('../controllers/AuthController');

const authController = new AuthController();

// Rota para registro de usuário
registerRouter.post('/', (req, res) => {
  authController.register(req, res);
});

module.exports = registerRouter;