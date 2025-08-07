import React from "react";

function MultipleChoice({ pergunta, onResponder }) {
  const imagemPath = pergunta.image
    ? `/imagens/${pergunta.image.split("/").pop()}`
    : null;

  return (
    <div className="question-box">
      {imagemPath && (
        <div style={{ marginBottom: "1rem" }}>
          <img
            src={imagemPath}
            alt="Ilustração"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      )}
      <h3>{pergunta.question}</h3>
      <div className="options">
        {pergunta.options.map((option, index) => (
          <button key={index} onClick={() => onResponder(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoice;
