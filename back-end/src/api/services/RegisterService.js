/* eslint-disable max-lines-per-function */
const { Op } = require('sequelize');
const md5 = require('md5');
const { User } = require('../../database/models');

const Register = {

  async register(name, email, password, role) {
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
        role: role || 'customer',
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error('Ocorreu um erro ao registrar o usuário');
    }
  },
};

module.exports = Register;
