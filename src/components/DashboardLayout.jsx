import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PanelLeft, Search, Bell, ChevronDown, Menu, X, LogOut, Globe, Plus } from 'lucide-react'
import { Logo } from './PublicLayout'
import { Avatar, Button, cx } from './ui'
import { useStore } from '../lib/store'

export default function DashboardLayout({ nav, badge, user, primaryAction, searchPlaceholder }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setMobileOpen(false), [location.pathname])

  const sidebar = (isMobile) => (
    <div className="flex h-full flex-col gap-4 px-3 py-4">
      <div className={cx('flex h-10 items-center gap-2 px-2', collapsed && !isMobile && 'justify-center px-0')}>
        <Link to="/" aria-label="Encore home"><Logo compact={collapsed && !isMobile} /></Link>
        {(!collapsed || isMobile) && <span className="ml-auto rounded-full border border-zinc-200 px-2 text-xs text-zinc-600">{badge}</span>}
      </div>
      <nav aria-label={badge} className="flex flex-col gap-1">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            title={collapsed && !isMobile ? item.label : undefined}
            className={({ isActive }) =>
              cx(
                'flex h-10 items-center gap-3 rounded-lg text-sm transition-colors',
                collapsed && !isMobile ? 'justify-center' : 'px-3',
                isActive ? 'bg-accent-soft font-medium text-accent' : 'text-zinc-700 hover:bg-zinc-100 hover:text-ink'
              )
            }
          >
            <item.icon size={18} aria-hidden="true" />
            {(!collapsed || isMobile) && <span>{item.label}</span>}
            {(!collapsed || isMobile) && item.count ? (
              <span className="ml-auto flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-xs font-semibold text-white">{item.count}</span>
            ) : null}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-zinc-200 pt-4">
        <Link to="/" className={cx('flex h-10 items-center gap-3 rounded-lg text-sm text-zinc-700 hover:bg-zinc-100', collapsed && !isMobile ? 'justify-center' : 'px-3')} title="Back to website">
          <Globe size={18} aria-hidden="true" />
          {(!collapsed || isMobile) && 'Back to website'}
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-zinc-50 text-ink">
      <aside className={cx('sticky top-0 hidden h-screen shrink-0 border-r border-zinc-200 bg-white transition-[width] duration-200 lg:block', collapsed ? 'w-[72px]' : 'w-[248px]')}>
        {sidebar(false)}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-xl">
            <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute right-3 top-4 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-zinc-100"><X size={18} /></button>
            {sidebar(true)}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-zinc-200 bg-white px-4 sm:gap-4 sm:px-6">
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 lg:hidden" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <Menu size={18} />
          </button>
          <button type="button" className="hidden h-10 w-10 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 lg:flex" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)}>
            <PanelLeft size={18} />
          </button>
          <form role="search" className="max-w-md flex-1" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="app-search" className="sr-only">{searchPlaceholder}</label>
            <div className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-zinc-500 focus-within:border-accent">
              <Search size={16} aria-hidden="true" />
              <input id="app-search" type="search" placeholder={searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-zinc-400" />
              <kbd className="hidden rounded border border-zinc-200 bg-zinc-50 px-2 font-mono text-xs text-zinc-500 sm:inline">⌘K</kbd>
            </div>
          </form>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {primaryAction && (
              <Button to={primaryAction.to} className="hidden sm:inline-flex"><Plus size={16} aria-hidden="true" />{primaryAction.label}</Button>
            )}
            <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100" aria-label="Notifications, 2 unread">
              <Bell size={18} />
              <span aria-hidden="true" className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-accent" />
            </button>
            <UserMenu user={user} />
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1400px] flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function UserMenu({ user }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { signOut } = useStore()
  const navigate = useNavigate()
  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button type="button" aria-haspopup="menu" aria-expanded={open} aria-label={`Account menu for ${user.name}`} onClick={() => setOpen(!open)} className="flex h-12 items-center gap-2 rounded-lg px-2 text-left hover:bg-zinc-100">
        <Avatar initials={user.initials} size="sm" tone="accent" />
        <span className="hidden flex-col leading-tight md:flex">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-zinc-600">{user.subtitle}</span>
        </span>
        <ChevronDown size={16} className="text-zinc-500" aria-hidden="true" />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-14 w-56 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg">
          {user.links.map((l) => (
            <Link key={l.to} role="menuitem" to={l.to} onClick={() => setOpen(false)} className="flex h-10 items-center rounded-lg px-3 text-sm hover:bg-zinc-100">{l.label}</Link>
          ))}
          <div className="my-1 border-t border-zinc-200" />
          <button role="menuitem" type="button" onClick={() => { signOut(); navigate('/') }} className="flex h-10 w-full items-center gap-2 rounded-lg px-3 text-sm text-zinc-700 hover:bg-zinc-100">
            <LogOut size={16} aria-hidden="true" /> Sign out
          </button>
        </div>
      )}
    </div>
  )
}
