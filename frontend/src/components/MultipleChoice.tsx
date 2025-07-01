import React, { useState } from "react";

interface MultipleChoiceProps {
  data: {
    question: string;
    options: string[];
  };
  onComplete: (resposta: string) => void;
}

function MultipleChoice({ data, onComplete }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleSubmit = () => {
    onComplete(selected);
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h2 className="text-xl font-bold mb-4">{data.question}</h2>
      <ul className="mb-4">
        {data.options.map((option, idx) => (
          <li key={idx} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="resposta"
                value={option}
                checked={selected === option}
                onChange={() => handleSelect(option)}
                className="mr-2"
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="btn"
        disabled={!selected}
      >
        Submeter
      </button>
    </div>
  );
}

export default MultipleChoice;
