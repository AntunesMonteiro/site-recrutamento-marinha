import React from "react";

function MultipleChoice({ data, onAnswer }) {
  return (
    <div className="question-box">
      {data.image && (
        <div style={{ marginBottom: "1rem" }}>
          <img
            src={data.image}
            alt="Ilustração"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)"
            }}
          />
        </div>
      )}
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
