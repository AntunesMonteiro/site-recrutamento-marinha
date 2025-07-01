import React, { useState, useEffect } from "react";

interface MemoryTestProps {
  data: {
    variant: "lista_simples" | "pares_associativos";
    items?: string[];
    pairs?: [string, string][];
  };
  onComplete: (answers: string[]) => void;
}

function MemoryTest({ data, onComplete }: MemoryTestProps) {
  const [step, setStep] = useState<"memorizar" | "responder">("memorizar");
  const [timer, setTimer] = useState<number>(data.variant === "pares_associativos" ? 30 : 20);
  const [inputValues, setInputValues] = useState<string[]>([]);

  useEffect(() => {
    if (step === "memorizar" && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (step === "memorizar" && timer === 0) {
      setStep("responder");
    }
  }, [timer, step]);

  const handleChange = (value: string, index: number) => {
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
              {data.items?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="mt-4">Tempo restante: {timer}s</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Escreve as palavras que te lembras:</h2>
            {[...Array(data.items?.length || 0)].map((_, idx) => (
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

  if (data.variant === "pares_associativos") {
    return (
      <div className="p-6 max-w-xl mx-auto text-white">
        {step === "memorizar" ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Memoriza estes pares de palavras:</h2>
            <ul className="list-disc list-inside">
              {data.pairs?.map(([a, b], idx) => (
                <li key={idx}>{a} — {b}</li>
              ))}
            </ul>
            <p className="mt-4">Tempo restante: {timer}s</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Completa os pares (escreve a 2ª palavra):</h2>
            {data.pairs?.map(([a, _], idx) => (
              <div key={idx} className="mb-2">
                <label className="block mb-1">{a} —</label>
                <input
                  type="text"
                  placeholder="Resposta"
                  className="block w-full p-2 text-black rounded"
                  onChange={(e) => handleChange(e.target.value, idx)}
                />
              </div>
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
