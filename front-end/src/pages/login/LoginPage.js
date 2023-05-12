import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');

  const MIN_PASS_LENGTH = 6;
  const HTTP_NOT_FOUND = 404;

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
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      if (response.status === HTTP_NOT_FOUND) {
        setError('Credenciais inválidas');
        return;
      }

      // Lógica adicional em caso de login bem-sucedido
    } catch {
      setError('Ocorreu um erro ao fazer login');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={ handleLogin }>
        <div className="input-wrapper">
          <label htmlFor="email">
            Email
            <input
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
            Senha
            <input
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
          className="button-register"
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
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
