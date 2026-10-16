import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button, Card, Field, Input, PageHeader, Select, cx } from '../../components/ui'
import { STYLES, LEVELS } from '../../lib/data'
import { useStore } from '../../lib/store'

export default function Profile() {
  const { state, updateDancer, reset } = useStore()
  const [form, setForm] = useState(state.dancerProfile)
  const [saved, setSaved] = useState(false)
  const set = (k) => (e) => { setSaved(false); setForm({ ...form, [k]: e.target.value }) }
  const toggleStyle = (s) => { setSaved(false); setForm({ ...form, styles: form.styles.includes(s) ? form.styles.filter((x) => x !== s) : [...form.styles, s] }) }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Profile & settings" description="Helps instructors and recommendations fit your level." />
      <Card className="p-6">
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); updateDancer(form); setSaved(true) }}>
          <Field label="Full name" id="dname"><Input id="dname" value={form.name} onChange={set('name')} required /></Field>
          <Field label="Email" id="demail"><Input id="demail" type="email" value={form.email} onChange={set('email')} required /></Field>
          <Field label="Current level" id="dlevel"><Select id="dlevel" value={form.level} onChange={set('level')}>{LEVELS.map((l) => <option key={l}>{l}</option>)}</Select></Field>
          <Field label="Training goal" id="dgoal"><Input id="dgoal" value={form.goal} onChange={set('goal')} /></Field>
          <fieldset className="sm:col-span-2">
            <legend className="mb-2 text-sm font-medium">Styles you train</legend>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button key={s} type="button" aria-pressed={form.styles.includes(s)} onClick={() => toggleStyle(s)}
                  className={cx('h-9 rounded-full border px-4 text-sm', form.styles.includes(s) ? 'border-accent bg-accent-soft font-medium text-accent' : 'border-zinc-200 text-zinc-700 hover:border-zinc-400')}>{s}</button>
              ))}
            </div>
          </fieldset>
          <div className="flex items-center gap-3 sm:col-span-2">
            <Button as="button" type="submit">Save changes</Button>
            {saved && <span role="status" className="inline-flex items-center gap-1 text-sm text-accent"><Check size={16} aria-hidden="true" /> Saved</span>}
          </div>
        </form>
      </Card>
      <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-semibold">Reset preview data</h2>
          <p className="text-sm text-zinc-600">Clears purchases, subscriptions and edits saved in this browser.</p>
        </div>
        <Button variant="danger" onClick={() => { reset(); window.location.hash = '#/' }}>Reset</Button>
      </Card>
    </div>
  )
}
