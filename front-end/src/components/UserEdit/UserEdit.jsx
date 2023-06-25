import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function UserEditPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(`/admin/users/${id}`);
      const user = response.data;
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/admin/users/${id}`, { name, email, password });
      history.push('/admin/users');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
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

export default UserEditPage;
