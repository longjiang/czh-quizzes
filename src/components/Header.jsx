import React from 'react';

function Header() {
  return (
    <header className="relative">
      <div className="bg-white border-b border-sand/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://www.chinesezerotohero.com/wp-content/uploads/2022/07/czh_logo_dark.png"
              alt="Chinese Zero to Hero"
              className="h-10 w-auto"
            />
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Timed quizzes</p>
              <p className="text-lg font-bold text-slate-900">Interactive Practice Center</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-semibold text-slate-700">
            <span className="flex items-center gap-2 rounded-full bg-sand px-3 py-1 border border-amber-100 text-amber-900">
              <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden />
              Study smarter, not longer
            </span>
            <span className="text-slate-500">Beat the clock with confidence</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-r from-cocoa via-primary to-amber-500 text-white px-4 py-10 shadow-xl">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -left-16 -top-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="absolute right-6 -bottom-10 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" aria-hidden />
        </div>
        <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="max-w-2xl space-y-3 drop-shadow-sm">
            <p className="uppercase tracking-[0.2em] text-xs text-amber-100/80">Quiz yourself today</p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">Refresh your Mandarin before your next lesson.</h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl">
              Pick a course, choose a quiz, and see how many questions you can finish before time runs out.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/25 px-4 py-2 text-sm font-semibold backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
              Real practice. Instant feedback.
            </div>
          </div>
          <div className="hidden lg:flex">
            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-3">
                <img
                  src="https://www.chinesezerotohero.com/wp-content/uploads/2022/07/czh_logo_light.png"
                  alt="Chinese Zero to Hero light logo"
                  className="h-12 w-auto"
                />
                <div className="text-sm text-white/90 leading-snug">
                  <p className="font-semibold">Built for busy learners</p>
                  <p>Stay focused with warm colors inspired by our course catalog.</p>
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
