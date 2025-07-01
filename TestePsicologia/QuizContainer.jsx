import React, { useState } from "react";
import MultipleChoice from "./MultipleChoice";
import MemoryTest from "./MemoryTest";
import questions from "./data/questions.json";

function QuizContainer() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (response) => {
    setAnswers((prev) => [...prev, response]);
    setStep((prev) => prev + 1);
  };

  if (step === -1) {
    return (
      <div className="p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Testa as tuas aptidões</h2>
        <p className="mb-6">Este teste ajuda-te a descobrir as tuas competências.</p>
        <button className="btn" onClick={() => setStep(0)}>
          Iniciar Teste
        </button>
      </div>
    );
  }

  if (step >= questions.length) {
    return (
      <div className="p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Teste concluído!</h2>
        <p>Obrigado por participares.</p>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {currentQuestion.type === "multiple_choice" ? (
        <MultipleChoice
          questionData={currentQuestion}
          currentAnswer={null}
          onAnswer={handleAnswer}
        />
      ) : (
        <MemoryTest
          data={currentQuestion}
          onComplete={handleAnswer}
        />
      )}
    </div>
  );
}

export default QuizContainer;
