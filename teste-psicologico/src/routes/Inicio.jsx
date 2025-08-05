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
        <a href="/site-recrutamento-marinha/prepara.html" className="sair-btn">Sair</a>
      </div>
    </div>
  );
}

export default Inicio;
