const md5 = require('md5');
const { User } = require('../../database/models');

const LoginService = {
  async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user || md5(password) !== user.password) {
        return null;
      }

      return user;
    } catch (error) {
      throw new Error('Ocorreu um erro ao fazer login');
    }
  },
};

module.exports = LoginService;