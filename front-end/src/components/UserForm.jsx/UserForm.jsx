import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function UserFormPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/admin/users', { name, email, password });
      history.push('/admin/users');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Name"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />
        <input
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          placeholder="Password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserFormPage;
