import React from 'react';

function Results({ score, total, autoSubmitted }) {
  if (score === null) return null;
  return (
    <div className="mt-4 p-4 rounded-xl border border-cyan-200 bg-cyan-50 text-slate-800">
      <div className="text-lg font-bold">Score: {score} / {total}</div>
      <p className="text-sm mt-1">{autoSubmitted ? 'Time is up!' : 'Submission received.'}</p>
    </div>
  );
}

export default Results;
