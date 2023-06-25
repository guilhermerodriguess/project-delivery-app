const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

const adminRouter = express.Router();

adminRouter.get('/users', authMiddleware, UserController.getAllUsers);
adminRouter.post('/users', authMiddleware, UserController.createUser);
adminRouter.put('/users/:id', authMiddleware, UserController.updateUser);
adminRouter.delete('/users/:id', authMiddleware, UserController.deleteUser);

module.exports = adminRouter;
