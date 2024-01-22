// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap'; // Importe os componentes da barra de navegação
import UserList from './components/UserList';
import Pathways from './components/Pathways';

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Minha App</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/pathways">Pathways</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/pathways" element={<Pathways />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
