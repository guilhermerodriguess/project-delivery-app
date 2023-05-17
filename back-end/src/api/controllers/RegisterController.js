const RegisterService = require('../services/RegisterService');

const RegisterController = {
  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const newUser = await RegisterService.register(name, email, password);

      if (!newUser) {
        return res.status(409).json({ error: 'Nome ou email já em uso' });
      }

      return res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Ocorreu um erro ao registrar o usuário' });
    }
  },
};

module.exports = RegisterController;