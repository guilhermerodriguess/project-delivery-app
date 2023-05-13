const UserService = require('../services/UserService');

class AuthController {
  constructor() {
    this.userService = new UserService();
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await this.userService.login(email, password);

      if (!user) {
        return res.status(404).json({ error: 'Credenciais inválidas' });
      }

      return res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
      return res.status(500).json({ message: 'Ocorreu um erro ao fazer login' });
    }
  }

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const newUser = await this.userService.register(name, email, password);

      if (!newUser) {
        return res.status(409).json({ error: 'Nome ou email já em uso' });
      }

      return res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Ocorreu um erro ao registrar o usuário' });
    }
  }
}

module.exports = AuthController;
