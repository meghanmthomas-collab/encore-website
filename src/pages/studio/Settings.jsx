import { useState } from 'react'
import { Check } from 'lucide-react'
import { Badge, Button, Card, Field, Input, PageHeader, Textarea, cx } from '../../components/ui'
import { formatMoney } from '../../lib/data'
import { PLANS } from '../../lib/fees'
import { useStore } from '../../lib/store'

export default function Settings() {
  const { state, updatePro, setPlan } = useStore()
  const [form, setForm] = useState(state.proProfile)
  const [saved, setSaved] = useState(false)
  const set = (k) => (e) => { setSaved(false); setForm({ ...form, [k]: e.target.type === 'number' ? +e.target.value : e.target.value }) }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Profile & plan" description="What students see on your page, and how you pay the platform." />
      <Card className="p-6">
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); updatePro(form); setSaved(true) }}>
          <h2 className="text-base font-semibold sm:col-span-2">Public profile</h2>
          <Field label="Display name" id="pname"><Input id="pname" value={form.name} onChange={set('name')} required /></Field>
          <Field label="Headline" id="headline"><Input id="headline" value={form.headline} onChange={set('headline')} /></Field>
          <div className="sm:col-span-2"><Field label="Bio" id="bio"><Textarea id="bio" value={form.bio} onChange={set('bio')} /></Field></div>
          <Field label="All-access subscription price (USD / month)" id="sub"><Input id="sub" type="number" min="5" max="200" value={form.subscription} onChange={set('subscription')} /></Field>
          <Field label="Payout email" id="payout"><Input id="payout" type="email" value={form.payoutEmail} onChange={set('payoutEmail')} /></Field>
          <div className="flex items-center gap-3 sm:col-span-2">
            <Button as="button" type="submit">Save profile</Button>
            {saved && <span role="status" className="inline-flex items-center gap-1 text-sm text-accent"><Check size={16} aria-hidden="true" /> Saved</span>}
          </div>
        </form>
      </Card>
      <section aria-labelledby="plan-title" className="flex flex-col gap-4">
        <h2 id="plan-title" className="text-base font-semibold">Your plan</h2>
        <div role="radiogroup" aria-labelledby="plan-title" className="grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => {
            const on = state.proPlan === p.id
            return (
              <button key={p.id} type="button" role="radio" aria-checked={on} onClick={() => setPlan(p.id)}
                className={cx('flex flex-col gap-2 rounded-xl border bg-white p-6 text-left transition-colors', on ? 'border-2 border-accent' : 'border-zinc-200 hover:border-zinc-400')}>
                <span className="flex items-center justify-between"><span className="font-semibold">{p.name}</span>{on && <Badge tone="accent">Current plan</Badge>}</span>
                <span className="text-2xl font-semibold">{p.platformPercent}% <span className="text-sm font-normal text-zinc-600">per sale</span></span>
                <span className="text-sm text-zinc-700">{p.monthly ? `${formatMoney(p.monthly, { cents: false })} per month` : 'No monthly cost'}</span>
                <span className="text-sm text-zinc-600">{p.blurb}</span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
