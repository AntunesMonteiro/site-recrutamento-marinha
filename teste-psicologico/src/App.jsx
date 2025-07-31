import React, { useState } from "react";
import questions from "./questions.json";
import MultipleChoice from "./components/MultipleChoice";
import MemoryTest from "./components/MemoryTest";
import "./index.css";

function App() {
  const [step, setStep] = useState("inicio");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = questions.length;

  const handleStart = () => {
    setStep("quiz");
  };

  const handleAnswer = (resposta) => {
    setAnswers([...answers, resposta]);
    if (current < totalQuestions - 1) {
      setCurrent(current + 1);
    } else {
      setStep("resultado");
    }
  };

  const handleRestart = () => {
    setStep("inicio");
    setCurrent(0);
    setAnswers([]);
    setShowResults(false);
  };

  const renderQuestion = () => {
    const currentQuestion = questions[current];

    if (currentQuestion.type === "memory") {
      return (
        <MemoryTest
          question={currentQuestion}
          currentQuestionIndex={current}
          onAnswerUpdate={handleAnswer}
          onNextQuestion={() => {
            if (current < totalQuestions - 1) {
              setCurrent(current + 1);
            } else {
              setStep("resultado");
            }
          }}
        />
      );
    }

    return (
      <MultipleChoice
        data={currentQuestion}
        onAnswer={(resposta) =>
          handleAnswer({
            pergunta: current + 1,
            resposta,
            correta: currentQuestion.options[currentQuestion.answer],
          })
        }
      />
    );
  };

  const renderProgressBar = () => {
    const percentage = ((current + 1) / totalQuestions) * 100;

    return (
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${percentage}%` }}
        ></div>
        <p className="progress-text">
          Pergunta {current + 1} de {totalQuestions}
        </p>
      </div>
    );
  };

  const renderResultadosTabela = () => (
    <div className="question-box">
      <h3>Respostas</h3>
      <div style={{ overflowX: "auto" }}>
        <table className="memory-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Sua Resposta</th>
              <th>Correta</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((resposta, index) => {
              const q = questions[index];
              let correta;

              if (q.type === "memory") {
                const original =
                  q.variant === "lista_simples"
                    ? q.items
                    : q.pairs.map(([, b]) => b);

                    if (q.type === "memory") {
                      const original =
                        q.variant === "lista_simples"
                          ? q.items.map((w) => w.toLowerCase().trim())
                          : q.pairs.map(([, b]) => b.toLowerCase().trim());
                    
                      const respostas =
                        q.variant === "lista_simples"
                          ? resposta.resposta
                              .split(/[,\n\s]+/)
                              .map((w) => w.trim().toLowerCase())
                              .filter(Boolean)
                          : resposta.resposta
                              .split(" / ")
                              .map((r) => r.trim().toLowerCase());
                    
                      const acertos =
                        q.variant === "lista_simples"
                          ? respostas.filter((r) => original.includes(r)).length
                          : respostas.filter((r, i) => r === original[i]).length;
                    
                      correta = `${acertos}/${original.length}`;
                    }

              } else {
                correta = q.options[q.answer];
              }
              const corretaNormalizada = correta?.toLowerCase().trim();
              const respostaNormalizada = resposta?.resposta
                ?.toLowerCase()
                .trim();

              const certo =
                q.type !== "memory"
                  ? corretaNormalizada === respostaNormalizada
                  : null;

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{resposta.resposta}</td>
                  <td>{correta}</td>
                  <td>
                    {q.type === "memory" ? (
                      "—"
                    ) : (
                      <span className={certo ? "result-icon correct" : "result-icon incorrect"}>
                        {certo ? "✔️" : "❌"}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (step === "inicio") {
  return (
    <div className="app-container">
      <h1>Teste Psicológico</h1>
      <div className="button-group">
        <button onClick={handleStart}>Iniciar</button>
        <a href="/prepara.html" className="sair-btn">Sair</a>
      </div>
    </div>
  );
}

  if (step === "resultado") {
    return (
      <div className="app-container">
        <h2>Teste Concluído</h2>
        <p>Respostas submetidas com sucesso!</p>
        <div className="button-group">
          <button onClick={() => setShowResults(!showResults)}>
            {showResults ? "Esconder Resultados" : "Ver Resultados"}
          </button>
          <button onClick={handleRestart}>Voltar ao Início</button>
          <a href="/prepara.html" className="sair-btn">Sair</a>
        </div>
        {showResults && renderResultadosTabela()}
      </div>
    );
  }

  return (
    <div className="app-container">
      {renderQuestion()}
      {renderProgressBar()}
    </div>
  );
}

export default App;
