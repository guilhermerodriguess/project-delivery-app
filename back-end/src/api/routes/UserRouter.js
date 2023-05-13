const express = require('express');

const registerRouter = express.Router();
const UserController = require('../controllers/UserController');

// Rota para registro de usuário
registerRouter.post('/register', (req, res) => {
  UserController.register(req, res);
});

module.exports = registerRouter;