const UserService = require('../services/UserService');

class AuthController {
  constructor() {
    this.userService = new UserService();
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await this.userService.loginUser(email, password);

      if (!user) {
        return res.status(404).json({ error: 'Credenciais inválidas' });
      }

      return res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
      return res.status(500).json({ message: 'Ocorreu um erro ao fazer login' });
    }
  }
}

module.exports = AuthController;
