import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddUser = () => {
    axios.post('http://localhost:3001/users', { name, email })
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
      <div>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleAddUser}>Adicionar Usuário</button>
      </div>
    </div>
  );
}

export default App;
