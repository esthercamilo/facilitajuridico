import React, { useState } from 'react';
import axios from 'axios';

const Pathways = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddUser = () => {
    axios.post('http://localhost:3001/users', { name, email })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Adicionar Usuário</h1>
      <div>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleAddUser}>Adicionar Usuário</button>
      </div>
    </div>
  );
};

export default Pathways;
