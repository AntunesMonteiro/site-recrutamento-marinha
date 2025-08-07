import React, { useState, useEffect } from "react";
import "./memory.css";

function MemoryTest({ question, onAnswerUpdate, onNextQuestion, currentQuestionIndex }) {
  const [phase, setPhase] = useState("intro");
  const [timer, setTimer] = useState(60);
  const [inputText, setInputText] = useState(
    question.variant === "lista_simples" ? "" : []
  );

  const isListaSimples = question.variant === "lista_simples";
  const isParesAssociativos = question.variant === "pares_associativos";
  const isParesCulturais = question.variant === "pares_culturais";

  // Reinicia o input quando muda de pergunta
  useEffect(() => {
    if (question.variant === "lista_simples") {
      setInputText("");
    } else {
      setInputText([]);
    }
  }, [question]);

  // 🔁 Reinicia fase e temporizador ao trocar de pergunta
  useEffect(() => {
    setPhase("intro");
    setTimer(60);
  }, [question]);

  // Contagem decrescente do temporizador
  useEffect(() => {
    if (phase === "memorizar" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, timer]);

  const handleNext = () => {
    if (phase === "intro") {
      setTimer(60);
      setPhase("memorizar");
    } else if (phase === "memorizar") {
      setTimer(0);
      setPhase("resposta");
    } else if (phase === "resposta") {
      const resposta = isListaSimples
        ? inputText
        : inputText.map((r) => r || "").join(" / ");
      onAnswerUpdate({
        pergunta: currentQuestionIndex + 1,
        resposta,
      });

      setTimeout(() => {
        onNextQuestion();
      }, 100);
    }
  };

  const handleInputChange = (e, index) => {
    const newInput = [...inputText];
    newInput[index] = e.target.value;
    setInputText(newInput);
  };

  const renderIntro = () => (
    <div className="memory-box">
      <h3>Teste de Memória</h3>
      <p>{question.instruction}</p>
      <button onClick={handleNext}>Seguir</button>
    </div>
  );

  const renderMemorizar = () => (
    <div className="memory-box">
      <h3>Memorize as palavras</h3>
      <p className="timer">Tempo restante: {timer} segundos</p>

      {isListaSimples && (
        <ul className="memory-list">
          {question.items.map((word, i) => (
            <li key={i}>{word}</li>
          ))}
        </ul>
      )}

      {(isParesAssociativos || isParesCulturais) && (
        <table className="memory-table">
          <thead>
            <tr>
              <th>Palavra 1</th>
              <th>Palavra 2</th>
            </tr>
          </thead>
          <tbody>
            {question.pairs.map(([a, b], i) => (
              <tr key={i}>
                <td>{a}</td>
                <td>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={handleNext}>Seguir</button>
    </div>
  );

  const renderResposta = () => (
    <div className="memory-box">
      <h3>Responda com as palavras que se lembra</h3>

      {isListaSimples && (
        <div className="memory-input">
          <textarea
            rows={10}
            placeholder="Escreva aqui as palavras que se lembra..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
      )}

      {(isParesAssociativos || isParesCulturais) && (
        <div className="memory-input">
          <table className="memory-table">
            <thead>
              <tr>
                <th>Palavra 1</th>
                <th>Sua resposta</th>
              </tr>
            </thead>
            <tbody>
              {question.pairs.map(([a], i) => (
                <tr key={i}>
                  <td>{a}</td>
                  <td>
                    <input
                      type="text"
                      value={inputText[i] || ""}
                      onChange={(e) => handleInputChange(e, i)}
                      placeholder="Palavra associada"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={handleNext}>Submeter</button>
    </div>
  );

  return (
    <>
      {phase === "intro" && renderIntro()}
      {phase === "memorizar" && renderMemorizar()}
      {phase === "resposta" && renderResposta()}
    </>
  );
}

export default MemoryTest;
