import React, { useState } from "react";
import questions from "./questions.json";
import MultipleChoice from "./components/MultipleChoice";
import MemoryTest from "./components/MemoryTest";
import "./index.css";

function App() {
  const [step, setStep] = useState("inicio");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleStart = () => {
    setStep("quiz");
  };

  const handleAnswer = (resposta) => {
    setAnswers([...answers, resposta]);
    if (current < questions.length - 1) {
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
          onAnswerUpdate={(resposta) => setAnswers([...answers, resposta])}
          onNextQuestion={() => {
            if (current < questions.length - 1) {
              setCurrent(current + 1);
            } else {
              setStep("resultado");
            }
          }}
          currentQuestionIndex={current}
        />
      );
    }
    

    if (
      currentQuestion.variant === "escolha_multipla" ||
      currentQuestion.variant === "sequencia" ||
      currentQuestion.variant === "problema" ||
      currentQuestion.variant === "imagem_escolha"
    ) {
      return (
        <MultipleChoice
          data={currentQuestion}
          onAnswer={handleAnswer}
        />
      );
    }

    return <p>Tipo de pergunta não suportado.</p>;
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
      <h2>Pergunta {current + 1}</h2>
      {renderQuestion()}
    </div>
  );
}

export default App;
