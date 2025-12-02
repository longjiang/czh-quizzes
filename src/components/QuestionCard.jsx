import React from 'react';

function QuestionCard({ question, index, value, disabled, onChange }) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  return (
    <article className="border border-slate-200 rounded-xl bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold mb-3">
        {index + 1}. {question.prompt}
      </h3>
      <div className="grid gap-2">
        {question.options.map((optionText, optIndex) => {
          const optionValue = letters[optIndex];
          const isCorrect = value && question.correctOption === optionValue;
          const isSelected = value === optionValue;
          return (
            <label
              key={optionValue}
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm transition-colors ${
                isCorrect
                  ? 'border-emerald-400 bg-emerald-50'
                  : isSelected && value !== question.correctOption
                  ? 'border-rose-400 bg-rose-50'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name={`q-${index}`}
                className="accent-primary"
                value={optionValue}
                disabled={disabled}
                checked={isSelected || false}
                onChange={() => onChange(optionValue)}
              />
              <span>
                <strong className="mr-2">{optionValue}.</strong>
                {optionText}
              </span>
            </label>
          );
        })}
      </div>
    </article>
  );
}

export default QuestionCard;
