import React from 'react';

function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-sky-900 via-cyan-700 to-emerald-600 text-white px-6 py-9 shadow-xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 -top-16 h-48 w-48 rounded-full bg-white/15 blur-3xl" aria-hidden />
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-300/20 blur-3xl" aria-hidden />
      </div>
      <div className="relative flex items-center justify-between gap-6">
        <div className="drop-shadow-sm">
          <p className="uppercase tracking-[0.2em] text-xs opacity-80">Chinese Zero to Hero</p>
          <h1 className="text-3xl font-bold mt-1 drop-shadow">Interactive Quiz Center</h1>
          <p className="text-white/90 drop-shadow">Choose a course, pick a quiz, and beat the clock.</p>
        </div>
        <div className="border border-white/40 bg-white/15 rounded-full px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur">
          Timed
        </div>
      </div>
    </header>
  );
}

export default Header;
