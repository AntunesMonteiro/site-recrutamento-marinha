import React, { useState, useEffect } from 'react';
import './memory.css'; 

function Resultado() {
  const [respostas, setRespostas] = useState([]);
  const [mostrarTabela, setMostrarTabela] = useState(false);

  useEffect(() => {
    const storedRespostas = JSON.parse(localStorage.getItem('resultados'));
    if (storedRespostas && Array.isArray(storedRespostas)) {
      setRespostas(storedRespostas);
    }
  }, []);

  const verDetalhes = () => {
    setMostrarTabela(!mostrarTabela); 
  };

  return (
    <div className="resultado-container">
      <h1>Fim do Teste</h1>
      <p>Parabéns! Concluíste o teste psicológico.</p>

      <button onClick={verDetalhes} className="btn-ver-resultados">
        {mostrarTabela ? 'Esconder Resultados' : 'Ver Resultados'}
      </button>

      {mostrarTabela && (
        <div className="tabela-resultados">
          <table className="memory-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Pergunta</th>
                <th>Resposta</th>
              </tr>
            </thead>
            <tbody>
              {respostas.map((resposta, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{resposta.pergunta}</td>
                  <td>{resposta.resposta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <a href="/site-recrutamento-marinha/prepara.html" className="sair-btn">Sair</a>
    </div>
  );
}

export default Resultado;
