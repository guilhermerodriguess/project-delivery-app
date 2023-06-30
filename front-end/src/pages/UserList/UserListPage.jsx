/* eslint-disable react-func/max-lines-per-function */
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './UserListPage.css';

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const endpoint = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_LOCAL_ENDPOINT
    : process.env.REACT_APP_PRODUCTION_ENDPOINT;

  const MIN_NAME_LENGTH = 12;
  const MIN_PASS_LENGTH = 6;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && emailRegex.test(email);
  };

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${endpoint}/admin/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, [endpoint]);

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });

    // Validação do nome
    if (e.target.name === 'name' && e.target.value.length < MIN_NAME_LENGTH) {
      setErrorMessage('Nome completo deve ter pelo menos 12 caracteres');
    } else if (e.target.name === 'name') {
      setErrorMessage('');
    }

    // Validação do email
    if (e.target.name === 'email' && !validateEmail(e.target.value)) {
      setErrorMessage('Email inválido');
    } else if (e.target.name === 'email') {
      setErrorMessage('');
    }

    // Validação da senha
    if (e.target.name === 'password' && e.target.value.length < MIN_PASS_LENGTH) {
      setErrorMessage('Senha deve ter pelo menos 6 caracteres');
    } else if (e.target.name === 'password') {
      setErrorMessage('');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Verifica se há algum campo vazio
    if (
      newUser.name === ''
      || newUser.email === ''
      || newUser.password === ''
    ) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    // Verifica se o email é válido
    if (!validateEmail(newUser.email)) {
      setErrorMessage('Por favor, insira um email válido.');
      return;
    }

    // Verifica se a senha tem pelo menos 6 caracteres
    if (newUser.password.length < MIN_PASS_LENGTH) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      await fetch(`${endpoint}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
        }),
      });

      setNewUser({
        name: '',
        email: '',
        password: '',
        role: '',
      });
      getUsers();
    } catch (error) {
      console.log(error);
      console.error('Failed to add user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${endpoint}/admin/users/${userId}`);
      getUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      <h1>Cadastrar novo usuário</h1>
      {errorMessage && (
        <div>{errorMessage}</div>
      )}
      <div className="form-user-container">
        <form className="admin_former-register" onSubmit={ handleAddUser }>
          <label htmlFor="name">
            Nome
            <input
              id="name"
              type="text"
              placeholder="Nome e sobrenome"
              name="name"
              value={ newUser.name }
              onChange={ handleInputChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              placeholder="seu-email@site.com.br"
              name="email"
              value={ newUser.email }
              onChange={ handleInputChange }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              id="password"
              type="password"
              placeholder="******"
              name="password"
              value={ newUser.password }
              onChange={ handleInputChange }
            />
          </label>
          <label htmlFor="role">
            Tipo
            <select
              id="role"
              name="role"
              value={ newUser.role }
              onChange={ handleInputChange }
            >
              <option value="seller">Seller</option>
              <option value="customer">Customer</option>
              <option value="administrator">Administrator</option>
            </select>
          </label>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
      <h1>Lista de usuários</h1>
      <div className="user-list-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={ user.id }>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn-remove"
                    type="button"
                    onClick={ () => handleDeleteUser(user.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserListPage;
