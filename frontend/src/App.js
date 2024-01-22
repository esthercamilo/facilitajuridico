// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Modal } from 'react-bootstrap'; // Importe os componentes da barra de navegação
import ClientList from './components/ClientList';
import Pathways from './components/Pathways';

function App() {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Facilita Jurídico</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Clientes</Nav.Link>
              <Nav.Link as={Link} to="/rotas">Rotas</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/rotas" element={<Pathways />} />
          </Routes>
        </Container>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>


    </Router>
    
  );
}

export default App;
