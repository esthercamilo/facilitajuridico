import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import NovoClienteModal from './ModalNewClient';
import {Tabela} from './Tabela'

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientsIds, setSelectedClientsIds] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [show, setShow] = useState(false);
  
  

  const fetchDataForClients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/clients');
      setClients(response.data);  // Atualiza o estado da lista de clientes
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      // Tratar erros conforme necessário
    }
  };

  const handleClose = async () => {
    await fetchDataForClients(); 
    setShow(false);
  }


  useEffect(() => {
    axios.get('http://localhost:3001/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error(error));
  }, [showDeleteAlert]);


  return (
    <div className="container">
      <h1 className="my-4">Lista de Clientes</h1>
      
        <Tabela clients={clients} />
    
        <NovoClienteModal show={show} handleClose={handleClose} fetchDataForClients={fetchDataForClients}>
          
        </NovoClienteModal>

    </div>

  );
};

export default ClientList;
