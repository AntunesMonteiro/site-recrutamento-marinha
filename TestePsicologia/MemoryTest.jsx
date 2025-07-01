import React, { useState, useEffect } from "react";

function MemoryTest({ data, onComplete }) {
  const [step, setStep] = useState("memorizar");
  const [timer, setTimer] = useState(20);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    if (step === "memorizar" && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (step === "memorizar" && timer === 0) {
      setStep("responder");
    }
  }, [timer, step]);

  const handleChange = (value, index) => {
    const updated = [...inputValues];
    updated[index] = value;
    setInputValues(updated);
  };

  const handleSubmit = () => {
    onComplete(inputValues);
  };

  if (data.variant === "lista_simples") {
    return (
      <div className="p-6 max-w-xl mx-auto text-white">
        {step === "memorizar" ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Memoriza estas palavras:</h2>
            <ul className="list-disc list-inside">
              {data.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="mt-4">Tempo restante: {timer}s</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Escreve as palavras que te lembras:</h2>
            {[...Array(data.items.length)].map((_, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Palavra ${idx + 1}`}
                className="block w-full mb-2 p-2 text-black rounded"
                onChange={(e) => handleChange(e.target.value, idx)}
              />
            ))}
            <button onClick={handleSubmit} className="mt-4 btn">
              Submeter
            </button>
          </div>
        )}
      </div>
    );
  }

  return <p className="text-white">Variante de memória não suportada.</p>;
}

export default MemoryTest;
