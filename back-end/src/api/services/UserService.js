const { Op } = require('sequelize');
const md5 = require('md5');
const { User } = require('../../database/models');

const UserService = {

  async register(name, email, password) {
    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ name }, { email }] },
      });

      if (existingUser) {
        return null;
      }

      const newUser = await User.create({
        name,
        email,
        password: md5(password),
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error('Ocorreu um erro ao registrar o usuário');
    }
  },
};

module.exports = UserService;
