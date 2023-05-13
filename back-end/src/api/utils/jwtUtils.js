const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Ler a chave secreta do arquivo
const keyPath = path.resolve('jwt.evaluation.key');
const secretKey = fs.readFileSync(keyPath, 'utf8');

const JWT_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

const generateToken = (data) => {
  try {
    const token = jwt.sign({ data }, secretKey, JWT_CONFIG);
    return token;
  } catch (error) {
    throw new Error('Erro ao criar o token');
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.data;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

module.exports = { generateToken, verifyToken };
