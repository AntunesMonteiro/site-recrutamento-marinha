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

  // Atualiza as respostas e chama o callback final se for a última
  const handleAnswer = (resposta, callback = null) => {
    setAnswers((prev) => {
      const updated = [...prev, resposta];
      if (callback) callback(updated);
      return updated;
    });
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

    // Perguntas de memória
    if (currentQuestion.type === 'memory') {
      return (
        <MemoryTest
          question={currentQuestion}
          onAnswerUpdate={(resposta) => {
            if (current < totalQuestions - 1) {
              handleAnswer(resposta);
              handleNext();
            } else {
              // Última pergunta de memória — garante navegação só depois de guardar
              handleAnswer(resposta, (respostasFinais) => {
                navigate('/resultado', { state: { respostas: respostasFinais } });
              });
            }
          }}
          onNextQuestion={() => {}}
          currentQuestionIndex={current}
        />
      );
    }

    // Perguntas de escolha múltipla
    return (
      <MultipleChoice
        pergunta={currentQuestion}
        onResponder={(resposta) => {
          const respostaObj = {
            pergunta: current + 1,
            resposta,
            correta: currentQuestion.options[currentQuestion.answer],
          };

          if (current < totalQuestions - 1) {
            handleAnswer(respostaObj);
            handleNext();
          } else {
            // Última pergunta — garante que resposta é guardada antes de navegar
            handleAnswer(respostaObj, (respostasFinais) => {
              navigate('/resultado', { state: { respostas: respostasFinais } });
            });
          }
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
