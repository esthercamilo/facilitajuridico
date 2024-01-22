import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';

const Pathways = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [coord_x, setCoordX] = useState(null);
  const [coord_y, setCoordY] = useState(null);

  const handleAddUser = () => {
    axios.post('http://localhost:3001/users', { name, email, telefone, coord_x, coord_y })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Adicionar Usuário</h1>
      <div>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <input type="text" placeholder="Coordenada X" value={coord_x} onChange={(e) => setCoordX(e.target.value)} />
        <input type="text" placeholder="Coordenada Y" value={coord_y} onChange={(e) => setCoordY(e.target.value)} />
        <button onClick={handleAddUser}>Adicionar Usuário</button>
      </div>
    </div>
  );
};

export default Pathways;
