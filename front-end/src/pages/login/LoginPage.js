import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ handleLogin }>
        <div>
          <label htmlFor="username">
            Username:
            <input
              data-testid="common_login__input-email"
              type="text"
              id="username"
              value={ username }
              onChange={ (e) => setUsername(e.target.value) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              data-testid="common_login__input-password"
              type="password"
              id="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
        </div>
        <button
          data-testid="common_login__button-login"
          type="submit"
        >
          Login
        </button>
      </form>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        Ainda não tenho conta
      </button>
      <div data-testid="common_login__element-invalid-email" className="error-message" />
    </div>

  );
}

export default LoginPage;
