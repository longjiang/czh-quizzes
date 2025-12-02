import React from 'react';

function QuestionCard({ question, index, value, disabled, revealAnswers, onChange }) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
      <article className="border border-amber-100 rounded-xl bg-white/95 p-4 shadow-sm shadow-amber-900/5">
        <h3 className="text-base font-semibold mb-3">
          {index + 1}. {question.prompt}
        </h3>
      <div className="grid gap-2">
        {question.options.map((optionText, optIndex) => {
          const optionValue = letters[optIndex];
          const isSelected = value === optionValue;
          const isCorrectAnswer = question.correctOption === optionValue;

            const visualState = () => {
              if (revealAnswers) {
                if (isCorrectAnswer) return 'border-emerald-400 bg-emerald-50 text-emerald-900';
                if (isSelected) return 'border-rose-400 bg-rose-50 text-rose-900';
              }
              if (isSelected) return 'border-amber-400 bg-amber-50 text-cocoa shadow-sm';
              return 'border-amber-100 bg-white hover:border-amber-200 hover:bg-amber-50/60';
            };

          return (
            <label
              key={optionValue}
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${visualState()}`}
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
