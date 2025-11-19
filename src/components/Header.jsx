import React from 'react'

function Header({ monthLabel, onPrev, onNext }) {
  return (
    <div className="sticky top-0 z-20 px-4 pt-3 pb-2 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <button onClick={onPrev} className="active:scale-95 transition text-white/90 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
          ◀
        </button>
        <div className="text-center">
          <div className="text-xs uppercase tracking-wide text-white/50">Month</div>
          <div className="text-lg font-semibold text-white">{monthLabel}</div>
        </div>
        <button onClick={onNext} className="active:scale-95 transition text-white/90 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
          ▶
        </button>
      </div>
    </div>
  )
}

export default Header
