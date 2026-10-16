import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { GraduationCap, Sparkles } from 'lucide-react'
import { Button, Card, Field, Input, cx } from '../components/ui'
import { useStore } from '../lib/store'

export default function SignIn() {
  const [params] = useSearchParams()
  const [role, setRole] = useState(params.get('as') === 'pro' ? 'pro' : 'dancer')
  const join = params.get('mode') === 'join'
  const { signIn, state } = useStore()
  const navigate = useNavigate()
  const next = params.get('next')

  const submit = (e) => {
    e.preventDefault()
    signIn(role)
    const dest = next && next.startsWith(role === 'pro' ? '/studio' : '/') && !(role === 'dancer' && next.startsWith('/studio')) ? next : role === 'pro' ? '/studio' : '/account'
    navigate(dest)
  }

  const email = role === 'pro' ? state.proProfile.payoutEmail : state.dancerProfile.email

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight">{join ? 'Create your account' : 'Welcome back'}</h1>
        <p className="mt-2 text-zinc-600">Choose how you’re using Encore.</p>
      </div>
      <div role="radiogroup" aria-label="Account type" className="grid grid-cols-2 gap-3">
        {[
          { id: 'dancer', label: 'I’m a dancer', sub: 'Take classes', icon: GraduationCap },
          { id: 'pro', label: 'I’m an instructor', sub: 'Teach & sell', icon: Sparkles },
        ].map((r) => (
          <button key={r.id} type="button" role="radio" aria-checked={role === r.id} onClick={() => setRole(r.id)}
            className={cx('flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors', role === r.id ? 'border-2 border-accent bg-accent-soft' : 'border-zinc-200 hover:border-zinc-400')}>
            <r.icon size={20} className="text-accent" aria-hidden="true" />
            <span className="font-semibold">{r.label}</span>
            <span className="text-sm text-zinc-600">{r.sub}</span>
          </button>
        ))}
      </div>
      <Card className="p-6">
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <Field label="Email" id="email"><Input id="email" type="email" defaultValue={email} key={role} required /></Field>
          <Field label="Password" id="password"><Input id="password" type="password" defaultValue="demo-password" required /></Field>
          <Button as="button" type="submit" size="lg">{join ? 'Create account' : 'Sign in'} as {role === 'pro' ? 'instructor' : 'dancer'}</Button>
        </form>
      </Card>
      <p className="text-center text-sm text-zinc-600">Preview build: sign-in is simulated and any password works. Your activity is saved in this browser only.</p>
    </div>
  )
}
