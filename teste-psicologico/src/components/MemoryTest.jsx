import React, { useState, useEffect } from "react";
import "./memory.css";

function MemoryTest({ question, onAnswerUpdate, onNextQuestion, currentQuestionIndex }) {
  const [phase, setPhase] = useState("intro");
  const [timer, setTimer] = useState(60);
  const [inputText, setInputText] = useState("");

  const isListaSimples = question.variant === "lista_simples";
  const isParesAssociativos = question.variant === "pares_associativos";
  const isParesCulturais = question.variant === "pares_culturais";

  useEffect(() => {
    if (isListaSimples) {
      setInputText("");
    } else {
      setInputText([]);
    }
  }, [question]);

  useEffect(() => {
    if (phase === "memorizar" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
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
      const resposta =
        isListaSimples ? inputText : inputText.map((item) => item.trim());
      onAnswerUpdate({
        pergunta: currentQuestionIndex + 1,
        resposta,
      });
      setPhase("intro");
      setInputText(isListaSimples ? "" : []);
      onNextQuestion();
    }
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
          {question.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {(isParesAssociativos || isParesCulturais) && (
        <table className="pairs-table">
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
        <>
          <textarea
            rows={10}
            placeholder="Escreva aqui as palavras que se lembra..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </>
      )}

      {(isParesAssociativos || isParesCulturais) && (
        <table className="pairs-table">
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
                    onChange={(e) => {
                      const newAnswers = [...inputText];
                      newAnswers[i] = e.target.value;
                      setInputText(newAnswers);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
