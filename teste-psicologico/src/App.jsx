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
        <button onClick={handleRestart}>Voltar ao Início</button>
      </div>
    );
  }

  const currentQuestion = questions[current];

  return (
    <div className="app-container">
      <h2>Pergunta {current + 1}</h2>
      {currentQuestion.type === "MultipleChoice" && (
        <MultipleChoice data={currentQuestion} onAnswer={handleAnswer} />
      )}
      {currentQuestion.type === "MemoryTest" && (
        <MemoryTest data={currentQuestion} onAnswer={handleAnswer} />
      )}
    </div>
  );
}

export default App;
