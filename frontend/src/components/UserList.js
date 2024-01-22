import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const BarraFerramentas = ({ onNovoClick, onExcluirClick }) => {
    return (
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary me-2" onClick={onNovoClick}>
          Novo
        </button>
        <button className="btn btn-danger" onClick={onExcluirClick}>
          Excluir
        </button>
      </div>
    );
  };


  const Tabela = ({ users }) => {

    const handleCheckboxChange = (userId) => {
        // Verifique se o usuário já está na lista de IDs selecionados
        if (selectedUserIds.includes(userId)) {
          // Se estiver, remova-o
          setSelectedUserIds(prevIds => prevIds.filter(id => id !== userId));
        } else {
          // Se não estiver, adicione-o
          setSelectedUserIds(prevIds => [...prevIds, userId]);
        }
      };


    const handleNovoClick = () => {
        // Lógica para ação "Novo"
        console.log('Botão Novo clicado');
      };
    
      const handleExcluirClick = async () => {
        try {
          // Faça uma solicitação para excluir usuários selecionados
          const response = await axios.delete('http://localhost:3001/users', {
            data: { selectedUserIds }, // Enviar IDs dos usuários a serem excluídos no corpo da solicitação
          });
    
          const data = response.data;
    
          if (data.success) {
            console.log('Usuários excluídos com sucesso:', data.message);
            // Atualize o estado da sua aplicação ou faça outras ações necessárias
          } else {
            console.error('Erro ao excluir usuários:', data.message);
          }
        } catch (error) {
          console.error('Erro ao excluir usuários:', error);
        }
      };

    return (
      <div>
         <BarraFerramentas onNovoClick={handleNovoClick} onExcluirClick={handleExcluirClick} />
          
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Selecionar</th>
            <th>Email</th>
            <th>Telefone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <label htmlFor={user.id}>
                    <input
                    className="form-check-input"
                    type="checkbox"
                    id={user.id}
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                    />
                    &emsp;{user.name}
                </label>

              </td>
              <td>{user.email}</td>
              <td>{user.telefone}</td>
              <td><i className="fas fa-edit"></i></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };


  return (
    <div className="container">
      <h1 className="my-4">Lista de Usuários</h1>
      
        <Tabela users={users} />
    
    </div>
  );
};

export default UserList;
