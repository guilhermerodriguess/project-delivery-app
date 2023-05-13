const { User } = require('../models');
const { Op } = require('sequelize');
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
      // Verifica se já existe um usuário com o mesmo nome ou email
      const existingUser = await User.findOne({
        where: { 
          [Op.or]: [
            { name: name },
            { email: email }
          ]
        }
      });

      if (existingUser) {
        return null; // Retorna null se o usuário já existe
      }

      // Cria o usuário com a senha convertida para hash MD5
      const newUser = await User.create({
        name,
        email,
        password: md5(password),
      });

      return newUser; // Retorna o novo usuário criado
    } catch (error) {
      console.log(error)
      throw new Error('Ocorreu um erro ao registrar o usuário');
    }
  }
}

module.exports = UserService;
