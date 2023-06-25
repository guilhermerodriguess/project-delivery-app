const { User } = require('../../database/models');

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
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({ name, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
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
