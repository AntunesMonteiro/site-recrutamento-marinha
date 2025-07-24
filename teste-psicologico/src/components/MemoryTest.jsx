import React, { useState, useEffect } from "react";
import "./memory.css";

function MemoryTest({ data, onAnswer }) {
  const [step, setStep] = useState("memorize");
  const [timeLeft, setTimeLeft] = useState(10);
  const [input, setInput] = useState("");
  const [pairInputs, setPairInputs] = useState({});
  const [shownItems, setShownItems] = useState([]);

  useEffect(() => {
    if (data.items) {
      setShownItems(data.items);
    } else if (data.pairs) {
      setShownItems(data.pairs.map(pair => pair[0]));
    }
  }, [data]);

  useEffect(() => {
    if (step === "memorize") {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) {
            clearInterval(timer);
            setStep("recall");
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleInputChange = (key, value) => {
    setPairInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (data.variant === "pares_associativos") {
      onAnswer(pairInputs);
    } else {
      onAnswer(input);
    }
  };

  return (
    <div className="question-box">
      {step === "memorize" ? (
        <>
          <h2>Memoriza:</h2>
          <ul>
            {shownItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="timer">Tempo restante: {timeLeft}s</p>
        </>
      ) : (
        <>
          <h2>Responde:</h2>

          {data.variant === "lista_simples" && (
            <>
              <textarea
                rows={6}
                placeholder="Escreve as palavras que te lembras aqui..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </>
          )}

          {data.variant === "pares_associativos" && (
            <div className="input-pairs">
              {shownItems.map((item, index) => (
                <div className="input-pair" key={index}>
                  <label>
                    {item}
                    <input
                      type="text"
                      placeholder="Associação..."
                      value={pairInputs[item] || ""}
                      onChange={(e) =>
                        handleInputChange(item, e.target.value)
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          )}

          <button className="submit-btn" onClick={handleSubmit}>
            Submeter
          </button>
        </>
      )}
    </div>
  );
}

export default MemoryTest;
