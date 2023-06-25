import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <Link to="/admin/users/new">Add User</Link>
      <ul>
        {users.map((user) => (
          <li key={ user.id }>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserListPage;
