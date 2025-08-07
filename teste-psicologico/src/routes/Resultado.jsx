import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Resultado() {
  const navigate = useNavigate();
  const location = useLocation();
  const respostas = location.state?.respostas || [];

  const [mostrarTabela, setMostrarTabela] = useState(false);

  const contarPalavrasMemoria = (resposta) => {
    if (!resposta || typeof resposta !== "string") return 0;
    const palavras = resposta
      .split(/[ ,\/]+/) // divide por espaço, vírgula ou "/"
      .filter((w) => w.trim().length > 1);
    return palavras.length;
  };

  const renderTabela = () => (
    <table style={{ width: '100%', marginTop: '20px', color: 'white' }}>
      <thead>
        <tr>
          <th>Pergunta</th>
          <th>Tipo</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        {respostas.map((res, idx) => (
          <tr key={idx}>
            <td>{res.pergunta}</td>
            <td>{res.correta ? 'Escolha Múltipla' : 'Memória'}</td>
            <td>
              {res.correta
                ? res.resposta === res.correta
                  ? '✅ Correto'
                  : '❌ Incorreto'
                : `${contarPalavrasMemoria(res.resposta)} palavras`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="app-container">
      <div className="result-box">
        <h2>Teste Concluído!</h2>
        <p>Obrigado por participares no teste psicológico.</p>

        <div className="button-group">
          <button onClick={() => setMostrarTabela(!mostrarTabela)}>
            {mostrarTabela ? 'Ocultar Resultados' : 'Ver Resultados'}
          </button>
          <button onClick={() => navigate('/')}>Voltar ao Início</button>
          <button className="sair-btn" onClick={() => window.location.href = '/prepara.html'}>
            Sair
          </button>
        </div>

        {mostrarTabela && renderTabela()}
      </div>
    </div>
  );
}

export default Resultado;
