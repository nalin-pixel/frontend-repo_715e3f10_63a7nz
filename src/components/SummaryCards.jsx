import React from 'react'

const Stat = ({ label, value, accent }) => (
  <div className="flex-1 rounded-2xl p-4 bg-gradient-to-b from-purple-900/40 to-purple-950/40 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
    <div className="text-xs text-white/60 mb-1">{label}</div>
    <div className={`text-2xl font-semibold ${accent}`}>${Number(value || 0).toFixed(2)}</div>
  </div>
)

function SummaryCards({ summary }) {
  return (
    <div className="flex gap-3 px-4 max-w-xl mx-auto mt-4">
      <Stat label="Receipts" value={summary?.receipts_total} accent="text-purple-300" />
      <Stat label="Advances" value={summary?.advances_total} accent="text-fuchsia-300" />
      <Stat label="Net" value={summary?.net} accent="text-white" />
    </div>
  )
}

export default SummaryCards
