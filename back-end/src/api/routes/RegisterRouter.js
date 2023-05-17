const express = require('express');

const registerRouter = express.Router();
const UserController = require('../controllers/RegisterController');

// Rota para registro de usuário
registerRouter.post('/', UserController.register);

module.exports = registerRouter;