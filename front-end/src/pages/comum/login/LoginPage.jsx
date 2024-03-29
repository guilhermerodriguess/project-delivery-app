import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import logo from '../../../images/logo.png';

function LoginPage() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const MIN_PASS_LENGTH = 6;
  const HTTP_NOT_FOUND = 404;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      if (user.role === 'administratot') {
        history.push('admin/users');
      }
      if (user.role === 'seller') {
        history.push('/seller/orders');
      } else {
        history.push('/customer/products');
      }
    }
  }, [history]);

  const validateEmail = (email) => {
    // Validação de email incompleto e formato inválido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && emailRegex.test(email);
  };

  const validatePassword = (password) => password && password.length >= MIN_PASS_LENGTH;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmailValue(newEmail);
    if (!validateEmail(newEmail)) {
      setError('Email inválido');
    } else {
      setError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPasswordValue(newPassword);
    if (!validatePassword(newPassword)) {
      setError('Senha deve ter pelo menos 6 caracteres');
    } else {
      setError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Verifica se o email e a senha são válidos antes de prosseguir com o login

    if (!validateEmail(emailValue)) {
      setError('Email inválido');
      return;
    }

    if (!validatePassword(passwordValue)) {
      setError('Senha deve ter pelo menos 6 caracteres');
    }

    try {
      const endpoint = process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_LOCAL_ENDPOINT
        : process.env.REACT_APP_PRODUCTION_ENDPOINT;

      const response = await axios.post(`${endpoint}/login`, {
        email: emailValue,
        password: passwordValue,
      });

      if (response.status === HTTP_NOT_FOUND) {
        setError('Credenciais inválidas');
        return;
      }
      // Login bem-sucedido
      const { id, name, email, role, token } = response.data;

      // Armazenar os dados da pessoa usuária no localStorage
      const userData = { name, email, role, token };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', JSON.stringify(id));

      axios.defaults.headers.common.Authorization = token; // Define o token no cabeçalho das requisições

      if (role === 'administrator') {
        history.push('/admin/users');
      } else if (role === 'seller') {
        history.push('/seller/orders');
      } else {
        history.push('/customer/products');
      }
    } catch {
      setError('Ocorreu um erro ao fazer login');
    }
  };

  return (
    <div className="login-container">
      <img className="logo" src={ logo } alt="" />
      <h1>Delivery App</h1>
      <form className="form-container" onSubmit={ handleLogin }>
        <div className="input-wrapper">
          <label htmlFor="email">
            <input
              placeholder="email@delivery.com"
              type="email"
              id="email"
              value={ emailValue }
              onChange={ handleEmailChange }
              data-testid="common_login__input-email"
            />
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">
            <input
              placeholder="******"
              type="password"
              id="password"
              value={ passwordValue }
              onChange={ handlePasswordChange }
              data-testid="common_login__input-password"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={ !validateEmail(emailValue) || !validatePassword(passwordValue) }
          data-testid="common_login__button-login"
          className="button-login"
        >
          Login
        </button>
        <button
          className="button-dont-have"
          type="button"
          data-testid="common_login__button-register"
        >
          <Link className="link-style" to="/register">Ainda não tenho conta</Link>
        </button>
      </form>
      <div
        data-testid="common_login__element-invalid-email"
        className={ `error-message ${error ? '' : 'hidden'}` }
      >
        {error}
      </div>
    </div>
  );
}

export default LoginPage;
