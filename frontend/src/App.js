// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importe também o componente Routes
import UserList from './components/UserList';
import Pathways from './components/Pathways';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pathways">Pathways</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/pathways" element={<Pathways />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
