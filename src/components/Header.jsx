import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-br from-primary via-cyan-700 to-emerald-500 text-white px-7 py-6 shadow-lg flex justify-between items-center">
      <div className="drop-shadow-sm">
        <p className="uppercase tracking-[0.2em] text-xs opacity-80">Chinese Zero to Hero</p>
        <h1 className="text-3xl font-bold mt-1 drop-shadow">Interactive Quiz Center</h1>
        <p className="text-white/90 drop-shadow">Choose a course, pick a quiz, and beat the clock.</p>
      </div>
      <div className="border border-white/50 bg-white/15 rounded-full px-3 py-2 text-sm font-semibold">Timed</div>
    </header>
  );
}

export default Header;
