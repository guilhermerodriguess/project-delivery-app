const { User } = require('../models');
const md5 = require('md5');

class UserService {
  async login(email, password) {
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

  async register(name, email, password) {
    try {
      // Verifica se o email já está em uso
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return null; // Retorna null se o email já está em uso
      }

      // Cria o usuário com a senha convertida para hash MD5
      const newUser = await User.create({
        name,
        email,
        password: md5(password),
      });

      return newUser; // Retorna o novo usuário criado
    } catch (error) {
      throw new Error('Ocorreu um erro ao registrar o usuário');
    }
  }
}

module.exports = UserService;
