import React from 'react';

function Header() {
  return (
    <header className="relative">
      <div className="bg-amber-50 border-b border-amber-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://www.chinesezerotohero.com/wp-content/uploads/2022/07/czh_logo_dark.png"
              alt="Chinese Zero to Hero"
              className="h-10 w-auto"
            />
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-700 font-semibold">Chinese Zero to Hero</p>
              <p className="text-lg font-bold text-cocoa">Test Center</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm font-semibold text-cocoa">
            <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 border border-amber-200 text-cocoa shadow-inner">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              Practice ready
            </span>
            <span className="text-amber-800">Stay on track</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-r from-amber-100 via-sand to-white text-cocoa px-4 py-10 shadow-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-16 -top-24 h-56 w-56 rounded-full bg-amber-200/60 blur-3xl" aria-hidden />
          <div className="absolute right-6 -bottom-10 h-64 w-64 rounded-full bg-white/60 blur-3xl" aria-hidden />
        </div>
        <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="max-w-2xl space-y-3 drop-shadow-sm">
            <p className="uppercase tracking-[0.18em] text-xs text-amber-800 font-semibold">Mandarin quizzes</p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-cocoa">Test Center</h1>
            <p className="text-cocoa/80 text-base md:text-lg max-w-2xl">
              Choose your course and quiz, then start the timer when you are ready.
            </p>
          </div>
          <div className="hidden lg:flex">
            <div className="rounded-2xl border border-amber-200 bg-white/80 px-5 py-4 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-3">
                <img
                  src="https://www.chinesezerotohero.com/wp-content/uploads/2022/07/czh_logo_light.png"
                  alt="Chinese Zero to Hero light logo"
                  className="h-12 w-auto"
                />
                <div className="text-sm text-cocoa leading-snug">
                  <p className="font-semibold">Built for busy learners</p>
                  <p>Match your pace, track your time, and review answers instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
