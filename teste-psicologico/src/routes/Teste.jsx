import React, { useState } from 'react';
import questionsData from '../questions.json';
import MultipleChoice from '../components/MultipleChoice';
import MemoryTest from '../components/MemoryTest';
import '../index.css';
import { useNavigate } from 'react-router-dom';

function Teste() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const totalQuestions = questionsData.length;
  const currentQuestion = questionsData[current];

  const handleAnswer = (resposta) => {
    setAnswers((prev) => [...prev, resposta]);
  };

  const handleNext = () => {
    if (current < totalQuestions - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      navigate('/resultado', { state: { respostas: answers } });
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    if (currentQuestion.type === 'memory') {
      return (
        <MemoryTest
          question={currentQuestion}
          onAnswerUpdate={handleAnswer}
          onNextQuestion={handleNext}
          currentQuestionIndex={current}
        />
      );
    }

    return (
      <MultipleChoice
        pergunta={currentQuestion}
        onResponder={(resposta) => {
          handleAnswer({
            pergunta: current + 1,
            resposta,
            correta: currentQuestion.options[currentQuestion.answer],
          });
          handleNext();
        }}
      />
    );
  };

  const renderProgressBar = () => {
    const percentage = ((current + 1) / totalQuestions) * 100;

    return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
        <p className="progress-text">
          Pergunta {current + 1} de {totalQuestions}
        </p>
      </div>
    );
  };

  return (
    <div className="app-container">
      {renderQuestion()}
      {renderProgressBar()}
    </div>
  );
}

export default Teste;
