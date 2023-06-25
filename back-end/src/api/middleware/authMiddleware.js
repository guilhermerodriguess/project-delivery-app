const jwtUtils = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
  // Verifica se o token está presente no header da requisição
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwtUtils.verifyToken(token);

    // Adiciona os dados do usuário decodificado ao objeto da requisição
    req.user = jwtUtils.decodeToken(decoded);

    // Chama o próximo middleware ou rota
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token de autenticação inválido' });
  }
};

module.exports = authMiddleware;
