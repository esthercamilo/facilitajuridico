import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Lista de Clientes</h1>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <span>{user.name}</span>
              <span className="badge bg-primary">Email: {user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
