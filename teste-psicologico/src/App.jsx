import React, { useState } from "react";
import questions from "./questions.json";
import MultipleChoice from "./components/MultipleChoice";
import MemoryTest from "./components/MemoryTest";
import "./index.css";

function App() {
  const [step, setStep] = useState("inicio");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

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
  };

  const renderQuestion = () => {
    const currentQuestion = questions[current];

    if (currentQuestion.type === "memory") {
      return (
        <MemoryTest
          question={currentQuestion}
          currentQuestionIndex={current}
          onAnswerUpdate={handleAnswer}
        />
      );
    }

    return (
      <MultipleChoice
        data={currentQuestion}
        onAnswer={handleAnswer}
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

  if (step === "inicio") {
    return (
      <div className="app-container">
        <h1>Teste Psicológico</h1>
        <button onClick={handleStart}>Iniciar</button>
      </div>
    );
  }

  if (step === "resultado") {
    return (
      <div className="app-container">
        <h2>Teste Concluído</h2>
        <p>Respostas submetidas com sucesso!</p>
        <div className="button-group">
          <button onClick={handleRestart}>Voltar ao Início</button>
          <button className="sair-btn" onClick={() => window.close()}>
            Sair
          </button>
        </div>
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
