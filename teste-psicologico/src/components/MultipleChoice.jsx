import React from "react";

function MultipleChoice({ data, onAnswer }) {
  return (
    <div>
      <h3>{data.question}</h3>
      <div className="options">
        {data.options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoice;
