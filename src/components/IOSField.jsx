import React from 'react'

function IOSField({ label, children }) {
  return (
    <div className="px-4">
      <div className="max-w-xl mx-auto mt-3 rounded-2xl overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]">
        <div className="px-3 py-2 text-xs text-white/60 border-b border-white/10 bg-black/20">{label}</div>
        <div className="p-3 bg-black/20">{children}</div>
      </div>
    </div>
  )
}

export default IOSField
