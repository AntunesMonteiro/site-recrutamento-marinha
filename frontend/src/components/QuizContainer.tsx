import React, { useState } from "react";
import questions from "../data/questions";
import MultipleChoice from "./MultipleChoice";
import MemoryTest from "./MemoryTest";

function QuizContainer() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleComplete = (response: any) => {
    setAnswers((prev) => [...prev, response]);
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setCompleted(false);
  };

  if (completed) {
    const total = questions.filter(q => q.type === "multiple_choice").length;
    const correct = answers.filter((ans, idx) => {
      const q = questions[idx];
      return q.type === "multiple_choice" && q.correctIndex === ans;
    }).length;

    return (
      <div className="text-white text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Teste concluído!</h2>
        <p className="mb-2">Acertaste {correct} em {total} perguntas de escolha múltipla.</p>
        <button onClick={restart} className="btn mt-4">Voltar ao Início</button>
      </div>
    );
  }

  const q = questions[current];
  const progress = Math.round(((current + 1) / questions.length) * 100);

  return (
    <div className="text-white max-w-2xl mx-auto">
      <div className="w-full bg-gray-700 h-4 rounded mb-6">
        <div
          className="h-4 bg-green-400 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {q.type === "multiple_choice" ? (
        <MultipleChoice data={q} onComplete={handleComplete} />
      ) : (
        <MemoryTest data={q} onComplete={handleComplete} />
      )}
    </div>
  );
}

export default QuizContainer;
