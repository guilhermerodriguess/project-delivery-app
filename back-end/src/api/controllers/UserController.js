const { User } = require('../../database/models');
const RegisterService = require('../services/RegisterService');

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ error: 'Failed to get users' });
    }
  },
  
  async createUser(req, res) {
      const { name, email, password, role } = req.body;
  
      try {
        const newUser = await RegisterService.register(name, email, password, role);
  
        if (!newUser) {
          return res.status(409).json({ error: 'Nome ou email já em uso' });
        }
  
        return res.status(201).json({ message: 'Usuário registrado com sucesso' });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ocorreu um erro ao registrar o usuário' });
      }
    },
  
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const updatedUser = await User.update({ name, email, password }, { where: { id } });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },
  
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id } });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },
};

module.exports = UserController;
