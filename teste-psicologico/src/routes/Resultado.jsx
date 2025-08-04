// src/routes/Resultado.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Resultado() {
  const navigate = useNavigate();
  const location = useLocation();
  const respostas = location.state?.respostas || [];

  const verDetalhes = () => {
    console.log('Respostas:', respostas);
    alert('Resultados no console. Em breve aqui também!');
  };

  return (
    <div className="app-container">
      <div className="result-box">
        <h2>Teste Concluído!</h2>
        <p>Obrigado por participares no teste psicológico.</p>

        <div className="button-group">
          <button onClick={verDetalhes}>Ver Resultados</button>
          <button onClick={() => navigate('/')}>Voltar ao Início</button>
          <a href="/prepara.html" className="sair-btn">Sair</a>
        </div>
      </div>
    </div>
  );
}

export default Resultado;
