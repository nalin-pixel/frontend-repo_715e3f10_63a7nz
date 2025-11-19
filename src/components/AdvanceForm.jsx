import React, { useState } from 'react'

const Input = (props) => (
  <input {...props} className={`w-full px-3 py-2 rounded-xl bg-white/5 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 ${props.className||''}`} />
)

function AdvanceForm({ onSubmit }) {
  const todayISO = new Date().toISOString().slice(0,10)
  const [form, setForm] = useState({ date: todayISO, amount: '', note: '' })
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const payload = { ...form, amount: parseFloat(form.amount) }
    if (!payload.amount || isNaN(payload.amount)) return
    onSubmit(payload)
    setForm({ ...form, amount: '', note: '' })
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <Input type="date" name="date" value={form.date} onChange={handle} />
        <Input type="number" step="0.01" placeholder="Amount" name="amount" value={form.amount} onChange={handle} />
      </div>
      <Input placeholder="Note (optional)" name="note" value={form.note} onChange={handle} />
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-b from-fuchsia-600 to-fuchsia-800 text-white border border-white/10 shadow active:scale-95">
          Add Advance
        </button>
      </div>
    </form>
  )
}

export default AdvanceForm
