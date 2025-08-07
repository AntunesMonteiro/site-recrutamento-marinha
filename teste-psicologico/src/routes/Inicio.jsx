import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1>Teste Psicológico</h1>
      <div className="button-group">
        <button onClick={() => navigate('/teste')}>Iniciar</button>
        <button className="sair-btn" onClick={() => window.location.href = '/prepara.html'}>Sair</button>
      </div>
    </div>
  );
}

export default Inicio;
