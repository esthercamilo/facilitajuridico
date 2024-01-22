import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';

const Pathways = () => {
    const [resultado, setResultado] = useState(null);

    const handleClick = async () => {
      // Dados fictícios, substitua pelos seus clientes reais
      const pontos = [
        { x: 0, y: 0 },
        // Adicione aqui as coordenadas dos seus clientes
      ];
  
      try {
        const response = await axios.post('http://localhost:3001/solve-tsp', { pontos });
        setResultado(response.data);
      } catch (error) {
        console.error('Erro ao resolver o TSP:', error);
      }
    };
  
    return (
      <div>
        <button onClick={handleClick}>Resolver TSP</button>
        {resultado && (
          <div>
            <label>Melhor Caminho: {JSON.stringify(resultado.melhorCaminho)}</label>
            <label>Distância Total: {resultado.distanciaTotal}</label>
          </div>
        )}
      </div>
    );
};

export default Pathways;
