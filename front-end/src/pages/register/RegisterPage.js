import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');

  const history = useHistory(); // Obtém o objeto de histórico

  const MIN_NAME_LENGTH = 12;
  const MIN_PASS_LENGTH = 6;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && emailRegex.test(email);
  };

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
    if (newPassword.length < MIN_PASS_LENGTH) {
      setError('Senha deve ter pelo menos 6 caracteres');
    } else {
      setError('');
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setNameValue(newName);
    if (newName.length < MIN_NAME_LENGTH) {
      setError('Nome completo deve ter pelo menos 12 caracteres');
    } else {
      setError('');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica de registro do usuário aqui

    // Após o registro bem-sucedido, redireciona para a página de produtos do cliente
    history.push('/customer/products');
  };

  const isFormValid = () => (
    nameValue.length >= MIN_NAME_LENGTH
      && validateEmail(emailValue)
      && passwordValue.length >= MIN_PASS_LENGTH
  );

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <form onSubmit={ handleRegister }>
        <div className="input-wrapper">
          <label htmlFor="name">
            Nome
            <input
              type="text"
              id="name"
              value={ nameValue }
              onChange={ handleNameChange }
              data-testid="common_register__input-name"
            />
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              value={ emailValue }
              onChange={ handleEmailChange }
              data-testid="common_register__input-email"
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
              data-testid="common_register__input-password"
            />
          </label>
        </div>
        <button
          type="submit"
          className="button-register"
          data-testid="common_register__button-register"
          disabled={ !isFormValid() }
        >
          Registrar
        </button>
      </form>
      <div
        data-testid="common_register__element-invalid_register"
        className={ `error-message ${error ? '' : 'hidden'}` }
      >
        { error }
      </div>
      <div>
        Já possui uma conta?
        {' '}
        <Link to="/">Faça login</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
