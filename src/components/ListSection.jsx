import React from 'react'

function Row({ left, right, sub }) {
  return (
    <div className="px-4">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div>
            <div className="text-white">{left}</div>
            {sub && <div className="text-xs text-white/50">{sub}</div>}
          </div>
          <div className="text-white/90">{right}</div>
        </div>
      </div>
    </div>
  )
}

function ListSection({ title, items, emptyText }) {
  return (
    <div className="mt-4">
      <div className="px-4 text-xs text-white/60 uppercase tracking-wide max-w-xl mx-auto mb-1">{title}</div>
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
        {items.length === 0 ? (
          <div className="p-4 text-center text-white/40">{emptyText}</div>
        ) : (
          items.map((it, idx) => (
            <Row key={idx} left={it.left} right={it.right} sub={it.sub} />
          ))
        )}
      </div>
    </div>
  )
}

export default ListSection
