import React, { useState } from 'react'

const Input = (props) => (
  <input {...props} className={`w-full px-3 py-2 rounded-xl bg-white/5 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 ${props.className||''}`} />
)

const Select = (props) => (
  <select {...props} className={`w-full px-3 py-2 rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 ${props.className||''}`} />
)

function ReceiptForm({ onSubmit }) {
  const todayISO = new Date().toISOString().slice(0,10)
  const [form, setForm] = useState({ date: todayISO, meal_type: 'lunch', amount: '', merchant: '', note: '' })

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const payload = { ...form, amount: parseFloat(form.amount) }
    if (!payload.amount || isNaN(payload.amount)) return
    onSubmit(payload)
    setForm({ ...form, amount: '', merchant: '', note: '' })
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <Input type="date" name="date" value={form.date} onChange={handle} />
        <Select name="meal_type" value={form.meal_type} onChange={handle}>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </Select>
        <Input type="number" step="0.01" placeholder="Amount" name="amount" value={form.amount} onChange={handle} />
      </div>
      <Input placeholder="Merchant (optional)" name="merchant" value={form.merchant} onChange={handle} />
      <Input placeholder="Note (optional)" name="note" value={form.note} onChange={handle} />
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-b from-purple-600 to-purple-800 text-white border border-white/10 shadow active:scale-95">
          Add Receipt
        </button>
      </div>
    </form>
  )
}

export default ReceiptForm
