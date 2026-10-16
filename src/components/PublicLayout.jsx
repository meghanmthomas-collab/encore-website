import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button, cx } from './ui'
import { useStore } from '../lib/store'

export function Logo({ light = false, compact = false }) {
  return (
    <span className="flex items-center gap-2">
      <span className={cx('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', light ? 'bg-white text-accent' : 'bg-accent text-white')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 19c2-8 5-12 7-12s5 4 7 12" />
          <circle cx="12" cy="4" r="1.5" />
        </svg>
      </span>
      {!compact && <span className={cx('text-lg font-semibold tracking-tight', light ? 'text-white' : 'text-ink')}>Encore</span>}
    </span>
  )
}

const links = [
  { to: '/marketplace', label: 'Classes' },
  { to: '/instructors', label: 'Instructors' },
  { to: '/pricing', label: 'Pricing & fees' },
  { to: '/teach', label: 'Teach on Encore' },
]

export default function PublicLayout() {
  const [open, setOpen] = useState(false)
  const { state } = useStore()
  const home = state.user?.role === 'pro' ? '/studio' : '/account'

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Encore home"><Logo /></Link>
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => cx('rounded-lg px-3 py-2 text-sm font-medium', isActive ? 'text-accent' : 'text-zinc-600 hover:text-ink')}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            {state.user ? (
              <Button to={home}>{state.user.role === 'pro' ? 'Go to Studio' : 'My account'}</Button>
            ) : (
              <>
                <Button to="/sign-in" variant="ghost">Sign in</Button>
                <Button to="/sign-in?mode=join">Start learning</Button>
              </>
            )}
          </div>
          <button type="button" className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg hover:bg-zinc-100 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav aria-label="Mobile" className="flex flex-col gap-1 border-t border-zinc-200 px-4 py-4 md:hidden">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium text-zinc-700 hover:bg-zinc-50">{l.label}</Link>
            ))}
            <div className="mt-2 flex gap-2">
              {state.user ? (
                <Button to={home} className="flex-1" onClick={() => setOpen(false)}>{state.user.role === 'pro' ? 'Go to Studio' : 'My account'}</Button>
              ) : (
                <>
                  <Button to="/sign-in" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Sign in</Button>
                  <Button to="/sign-in?mode=join" className="flex-1" onClick={() => setOpen(false)}>Start learning</Button>
                </>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="text-sm text-zinc-600">Professional training from trained professionals.</p>
          </div>
          <FooterCol title="Learn" items={[['Browse classes', '/marketplace'], ['Instructors', '/instructors'], ['My account', '/account']]} />
          <FooterCol title="Teach" items={[['Teach on Encore', '/teach'], ['Pricing & fees', '/pricing'], ['Instructor studio', '/studio']]} />
          <FooterCol title="Encore" items={[['How it works', '/#how'], ['FAQ', '/pricing#faq'], ['Sign in', '/sign-in']]} />
        </div>
        <div className="border-t border-zinc-200">
          <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-zinc-500 sm:px-6 lg:px-8">© 2026 Encore. Preview build — instructors, classes and numbers shown are sample content.</p>
        </div>
      </footer>
    </div>
  )
}

function FooterCol({ title, items }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <ul className="flex flex-col gap-2">
        {items.map(([label, to]) => (
          <li key={label}><Link to={to} className="text-sm text-zinc-600 hover:text-accent">{label}</Link></li>
        ))}
      </ul>
    </div>
  )
}
