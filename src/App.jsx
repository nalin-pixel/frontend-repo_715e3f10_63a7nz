import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import IOSField from './components/IOSField'
import ReceiptForm from './components/ReceiptForm'
import AdvanceForm from './components/AdvanceForm'
import ListSection from './components/ListSection'

const API = import.meta.env.VITE_BACKEND_URL || ''

const monthLabel = (d) => d.toLocaleString('default', { month: 'long', year: 'numeric' })

function useMonth() {
  const [cursor, setCursor] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const label = useMemo(() => monthLabel(cursor), [cursor])
  const param = useMemo(() => `${cursor.getFullYear()}-${String(cursor.getMonth()+1).padStart(2,'0')}`,[cursor])
  return {
    label,
    param,
    prev: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth()-1, 1)),
    next: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth()+1, 1))
  }
}

async function api(path, opts={}) {
  const res = await fetch(`${API}${path}`, { headers: { 'Content-Type': 'application/json' }, ...opts })
  if (!res.ok) throw new Error('Request failed')
  return res.headers.get('content-type')?.includes('text/csv') ? res.text() : res.json()
}

function App() {
  const { label, param, prev, next } = useMonth()
  const [summary, setSummary] = useState(null)
  const [receipts, setReceipts] = useState([])
  const [advances, setAdvances] = useState([])

  const refresh = async () => {
    const [s, r, a] = await Promise.all([
      api(`/api/summary?month=${param}`),
      api(`/api/receipts?month=${param}`),
      api(`/api/advances?month=${param}`),
    ])
    setSummary(s)
    setReceipts(r)
    setAdvances(a)
  }

  useEffect(() => {
    refresh()
  }, [param])

  const addReceipt = async (payload) => {
    await api('/api/receipt', { method: 'POST', body: JSON.stringify(payload) })
    refresh()
  }

  const addAdvance = async (payload) => {
    await api('/api/advance', { method: 'POST', body: JSON.stringify(payload) })
    refresh()
  }

  const exportCsv = async () => {
    const csv = await api(`/api/export.csv?month=${param}`)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `meals-${param}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const receiptRows = receipts.map(r => ({
    left: `${r.date} · ${r.meal_type === 'lunch' ? 'Lunch' : 'Dinner'}${r.merchant ? ' · ' + r.merchant : ''}`,
    right: `$${Number(r.amount).toFixed(2)}`,
    sub: r.note || ''
  }))

  const advanceRows = advances.map(a => ({
    left: `${a.date}`,
    right: `$${Number(a.amount).toFixed(2)}`,
    sub: a.note || ''
  }))

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_50%_-100px,rgba(168,85,247,0.2),transparent)] bg-neutral-950 text-white">
      <Header monthLabel={label} onPrev={prev} onNext={next} />

      <SummaryCards summary={summary} />

      <div className="mt-4">
        <IOSField label="Add Receipt">
          <ReceiptForm onSubmit={addReceipt} />
        </IOSField>

        <IOSField label="Record Advance">
          <AdvanceForm onSubmit={addAdvance} />
        </IOSField>
      </div>

      <div className="px-4 max-w-xl mx-auto mt-4 flex justify-between items-center">
        <div className="text-xs text-white/60">History</div>
        <button onClick={exportCsv} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/90 active:scale-95">Export CSV</button>
      </div>

      <ListSection title="Receipts" items={receiptRows} emptyText="No receipts this month" />
      <ListSection title="Advances" items={advanceRows} emptyText="No advances this month" />

      <div className="h-16" />
    </div>
  )
}

export default App
