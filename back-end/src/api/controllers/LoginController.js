const LoginService = require('../services/LoginService');
const jwtUtils = require('../utils/jwtUtils');

const LoginController = {

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await LoginService.login(email, password);

      if (!user) {
        return res.status(404).json({ error: 'Credenciais inválidas' });
      }

      const token = jwtUtils.generateToken({
        name: user.name,
        email: user.email,
        role: user.role,
      });

      return res.status(200).json({ name: user.name, email: user.email, role: user.role, token });
    } catch (error) {
      return res.status(500).json({ message: 'Ocorreu um erro ao fazer login' });
    }
  },

};

module.exports = LoginController;
