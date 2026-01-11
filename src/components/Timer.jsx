import React from 'react';
import { formatTime } from '../utils/helpers.js';

function Timer({ totalSeconds, remainingSeconds }) {
  const progress = totalSeconds > 0 ? Math.max((remainingSeconds / totalSeconds) * 100, 0) : 100;
  return (
    <div className="sticky top-4 z-30 mb-5 rounded-xl border border-amber-100 bg-white/95 p-4 shadow-lg shadow-amber-900/5 backdrop-blur">
      <div className="flex items-center justify-between font-semibold text-cocoa">
        <span>Time Remaining</span>
        <span className="text-lg text-primary">{formatTime(Math.max(remainingSeconds, 0))}</span>
      </div>
      <div className="mt-3 h-3 rounded-full bg-amber-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-primary to-emerald-500 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default Timer;
