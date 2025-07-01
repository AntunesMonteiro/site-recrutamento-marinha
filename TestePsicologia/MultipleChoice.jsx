import React from "react";

function MultipleChoice({ questionData, currentAnswer, onAnswer }) {
  const { question, options } = questionData;

  const handleClick = (index) => {
    onAnswer(index);
  };

  return (
    <div className="multiple-choice-question p-4 rounded-lg shadow-lg bg-white text-black max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <ul className="space-y-2">
        {options.map((option, idx) => (
          <li key={idx}>
            <button
              className={`w-full text-left p-3 rounded border transition ${
                currentAnswer === idx ? "bg-blue-100 border-blue-400" : "bg-gray-100 border-gray-300"
              }`}
              onClick={() => handleClick(idx)}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MultipleChoice;