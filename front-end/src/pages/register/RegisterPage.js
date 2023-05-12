import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const history = useHistory(); // Obtém o objeto de histórico

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica de registro do usuário aqui

    // Após o registro bem-sucedido, redireciona para a página de produtos do cliente
    history.push('/customer/products');
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <form onSubmit={ handleRegister }>
        <div className="input-wrapper">
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              value={ emailValue }
              onChange={ handleEmailChange }
              data-testid="register__input-email"
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
              data-testid="register__input-password"
            />
          </label>
        </div>
        <button
          type="submit"
          className="button-register"
          data-testid="register__button-register"
        >
          Registrar
        </button>
      </form>
      <div>
        Já possui uma conta?
        {' '}
        <Link to="/">Faça login</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
