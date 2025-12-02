import React from 'react';
import { formatTime } from '../utils/helpers.js';

function Timer({ totalSeconds, remainingSeconds }) {
  const progress = totalSeconds > 0 ? Math.max((remainingSeconds / totalSeconds) * 100, 0) : 100;
  return (
    <div className="mb-4 p-3 bg-slate-100 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between font-semibold text-slate-800">
        <span>Time Remaining:</span>
        <span className="text-lg">{formatTime(Math.max(remainingSeconds, 0))}</span>
      </div>
      <div className="mt-3 h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default Timer;
