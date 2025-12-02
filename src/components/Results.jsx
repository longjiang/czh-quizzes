import React from 'react';

function Results({ score, total, autoSubmitted }) {
  if (score === null) return null;
  return (
    <div className="mt-4 p-4 rounded-xl border border-amber-200 bg-amber-50 text-cocoa shadow-sm shadow-amber-900/10">
      <div className="text-lg font-bold">Score: {score} / {total}</div>
      <p className="text-sm mt-1 text-slate-700">{autoSubmitted ? 'Time is up!' : 'Submission received.'}</p>
    </div>
  );
}

export default Results;
