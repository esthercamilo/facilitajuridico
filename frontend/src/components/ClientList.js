import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientsIds, setSelectedClientsIds] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    axios.get('http://localhost:3001/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error(error));
  }, [showDeleteAlert]);

  const BarraFerramentas = ({ onNovoClick, onExcluirClick, onFiltroChange }) => {
    return (
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Filtrar"
            onChange={onFiltroChange}
          />

        </div>
        <div class="btn-group" role="group" aria-label="">
          <button className="btn btn-primary" onClick={onNovoClick}>Novo</button>
          <button className="btn btn-danger" onClick={onExcluirClick}>Excluir</button>
        </div>
             
      </div>
    );
  };
  

  const Tabela = ({ clients }) => {

    const handleCheckboxChange = (clientId) => {
        // Verifique se o usuário já está na lista de IDs selecionados
        if (selectedClientsIds.includes(clientId)) {
          // Se estiver, remova-o
          setSelectedClientsIds(prevIds => prevIds.filter(id => id !== clientId));
        } else {
          // Se não estiver, adicione-o
          setSelectedClientsIds(prevIds => [...prevIds, clientId]);
        }
      };

    const handleFiltroChange = (event) => {
      const novoValor = event.target.value;
      setFiltro(novoValor);
      // Adicione aqui a lógica para filtrar seus dados com base em novoValor
      // Por exemplo, pode chamar uma função de filtragem passando o novoValor.
      // filtrarDados(novoValor);
    };

    const handleNovoClick = () => {
        setShowModal(true);
      };
    
    const handleExcluirClick = async () => {
      try {
        // Faça uma solicitação para excluir usuários selecionados
        const response = await axios.delete('http://localhost:3001/clients', {
          data: { selectedClientsIds }, // Enviar IDs dos clientes a serem excluídos no corpo da solicitação
        });
  
        const data = response.data;
  
        if (data.success) {
          console.log('Clientes excluídos com sucesso:', data.message);
          // Atualize o estado da sua aplicação ou faça outras ações necessárias
        } else {
          console.error('Erro ao excluir cliente:', data.message);
        }
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    };

    return (
      <div>
         <BarraFerramentas 
            onNovoClick={handleNovoClick}
            onExcluirClick={handleExcluirClick}
            onFiltroChange={handleFiltroChange}
         />
          
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Email</th>
            <th>Telefone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>
                <label htmlFor={client.id}>
                    <input
                    className="form-check-input"
                    type="checkbox"
                    id={client.id}
                    checked={selectedClientsIds.includes(client.id)}
                    onChange={() => handleCheckboxChange(client.id)}
                    />
                    &emsp;{client.name}
                </label>

              </td>
              <td>{client.email}</td>
              <td>{client.telefone}</td>
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
      <h1 className="my-4">Lista de Clientes</h1>
      
        <Tabela clients={clients} />
    
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
        </Modal>

    </div>

  );
};

export default ClientList;
