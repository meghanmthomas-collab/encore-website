import { Link } from 'react-router-dom'
import { Play, Radio, Layers, Star } from 'lucide-react'

const cx = (...c) => c.filter(Boolean).join(' ')
export { cx }

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  outline: 'border border-zinc-200 bg-white text-ink hover:bg-zinc-50',
  ghost: 'text-zinc-700 hover:bg-zinc-100',
  subtle: 'bg-accent-soft text-accent hover:bg-[#dae5ee]',
  danger: 'border border-zinc-200 bg-white text-red-700 hover:bg-red-50',
}
const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-base' }

export function Button({ as, to, variant = 'primary', size = 'md', className, children, ...props }) {
  const cls = cx(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap',
    variants[variant],
    sizes[size],
    className
  )
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>
  const Comp = as || 'button'
  return <Comp className={cls} {...(Comp === 'button' ? { type: 'button' } : {})} {...props}>{children}</Comp>
}

export function Card({ className, children, ...props }) {
  return <div className={cx('rounded-xl border border-zinc-200 bg-white', className)} {...props}>{children}</div>
}

export function Badge({ tone = 'neutral', className, children }) {
  const tones = {
    neutral: 'bg-zinc-100 text-zinc-700',
    accent: 'bg-accent-soft text-accent',
    outline: 'border border-zinc-300 text-zinc-700',
    dark: 'bg-black/60 text-white backdrop-blur',
  }
  return <span className={cx('inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-full px-2 text-xs font-medium', tones[tone], className)}>{children}</span>
}

export function Avatar({ initials, size = 'md', tone = 'neutral' }) {
  const s = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-16 w-16 text-lg', xl: 'h-24 w-24 text-2xl' }[size]
  const t = tone === 'accent' ? 'bg-accent text-white' : 'bg-zinc-100 text-zinc-700'
  return <span aria-hidden="true" className={cx('inline-flex shrink-0 items-center justify-center rounded-full font-semibold', s, t)}>{initials}</span>
}

export function Field({ label, hint, children, id }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">{label}</label>
      {children}
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  )
}

export const inputCls =
  'h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-ink placeholder:text-zinc-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20'

export function Input(props) {
  return <input {...props} className={cx(inputCls, props.className)} />
}
export function Select({ children, ...props }) {
  return <select {...props} className={cx(inputCls, 'pr-8', props.className)}>{children}</select>
}
export function Textarea(props) {
  return <textarea {...props} className={cx(inputCls, 'h-auto min-h-[96px] py-2', props.className)} />
}

const THUMB = {
  Ballet: '#013a63',
  Contemporary: '#24323f',
  'Hip-hop': '#18181b',
  Jazz: '#30343f',
  Flamenco: '#3a2a2a',
  Pointe: '#0f2a40',
  'Musical theatre': '#2a2f3a',
}

// Video thumbnail — a typographic tile until real cover images are uploaded.
export function Thumb({ cls, className, showPlay = true }) {
  const bg = THUMB[cls.style] || '#013a63'
  const TypeIcon = cls.type === 'live' ? Radio : cls.type === 'course' ? Layers : Play
  const typeLabel = cls.type === 'live' ? 'Live' : cls.type === 'course' ? `${cls.lessons} lessons` : 'Single class'
  return (
    <div className={cx('relative aspect-video overflow-hidden rounded-lg text-white', className)} style={{ background: bg }}>
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="1.5">
          <path d="M-20 170 C 60 40, 140 40, 200 120 S 300 200, 360 40" />
          <path d="M-20 150 C 70 20, 150 30, 210 105 S 310 180, 360 20" />
          <path d="M-20 190 C 50 70, 130 60, 190 140 S 290 220, 360 70" />
        </g>
      </svg>
      <div className="absolute left-3 top-3 flex gap-2">
        <Badge tone="dark"><TypeIcon size={12} aria-hidden="true" />{typeLabel}</Badge>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <p className="font-display text-xl leading-tight">{cls.style}</p>
        <p className="text-xs text-white/75">{cls.level}</p>
      </div>
      {showPlay && (
        <span aria-hidden="true" className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur">
          <Play size={16} fill="white" />
        </span>
      )}
    </div>
  )
}

export function Rating({ value, count }) {
  if (!value) return <span className="text-sm text-zinc-500">New</span>
  return (
    <span className="inline-flex items-center gap-1 text-sm text-zinc-700">
      <Star size={14} className="fill-accent text-accent" aria-hidden="true" />
      <span className="font-medium">{value.toFixed(1)}</span>
      {count != null && <span className="text-zinc-500">({count})</span>}
    </span>
  )
}

export function PageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        {description && <p className="text-zinc-600">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent"><Icon size={24} aria-hidden="true" /></span>
      <div className="flex max-w-sm flex-col gap-2">
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <p className="text-sm text-zinc-600">{children}</p>
      </div>
      {action}
    </div>
  )
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-md rounded-xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
