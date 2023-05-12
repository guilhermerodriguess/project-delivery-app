const { User } = require('../models');
const md5 = require('md5');

class UserService {
  async loginUser(email, password) {
    try {
      // Procura o usuário pelo email no banco de dados
      const user = await User.findOne({ where: { email } });

      // Verifica se o usuário existe e a senha está correta
      if (!user || md5(password) !== user.password) {
        return null; // Retorna null se o login for inválido
      }

      return user; // Retorna o usuário se o login for válido
    } catch (error) {
      throw new Error('Ocorreu um erro ao fazer login');
    }
  }
}

module.exports = UserService;
