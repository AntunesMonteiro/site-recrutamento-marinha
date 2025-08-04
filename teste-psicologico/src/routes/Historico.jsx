import React, { useEffect, useState } from 'react';

export default function Historico() {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/resultados')
      .then(res => res.json())
      .then(data => {
        setResultados(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar histórico:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>Histórico de Testes</h1>

      {loading ? (
        <p>A carregar histórico...</p>
      ) : resultados.length === 0 ? (
        <p>Nenhum teste realizado ainda.</p>
      ) : (
        <ul>
          {resultados.map((item, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <strong>Data:</strong> {item.data}<br />
              <strong>Respostas:</strong> {item.respostas.join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
