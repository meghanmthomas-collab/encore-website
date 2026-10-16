import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Play, Pause, Lock, Check, Clock, BarChart3, Layers, Radio, CalendarDays, ChevronLeft, Info } from 'lucide-react'
import { Avatar, Badge, Button, Card, Modal, Rating, Thumb } from '../components/ui'
import { getInstructor, formatMoney, formatMinutes, lessonOutline } from '../lib/data'
import { saleBreakdown } from '../lib/fees'
import { useStore } from '../lib/store'
import NotFound from './NotFound'

export default function ClassDetail() {
  const { id } = useParams()
  const { allClasses, studioClasses, state, buy, setProgress } = useStore()
  const navigate = useNavigate()
  const cls = allClasses.find((c) => c.id === id) || studioClasses.find((c) => c.id === id)
  const [checkout, setCheckout] = useState(false)
  const [done, setDone] = useState(false)
  const [playing, setPlaying] = useState(false)

  const owned = cls && (state.purchases.includes(cls.id) || state.subscriptions.includes(cls.instructor))
  const progress = (cls && state.progress[cls.id]) || 0

  useEffect(() => {
    if (!playing || !cls) return
    const t = setInterval(() => setProgress(cls.id, Math.min(100, (state.progress[cls.id] || 0) + 2)), 600)
    return () => clearInterval(t)
  }, [playing, cls, state.progress, setProgress])
  useEffect(() => { if (progress >= 100) setPlaying(false) }, [progress])

  if (!cls) return <NotFound />
  const inst = getInstructor(cls.instructor)
  const split = saleBreakdown(cls.price, 'pro')
  const TypeIcon = cls.type === 'live' ? Radio : cls.type === 'course' ? Layers : Play
  const outline = cls.type === 'course' ? Array.from({ length: cls.lessons }, (_, i) => `Lesson ${i + 1}: ${lessonOutline[i % lessonOutline.length]}`) : lessonOutline

  const startCheckout = () => {
    if (state.user?.role !== 'dancer') return navigate(`/sign-in?as=dancer&next=${encodeURIComponent('/class/' + cls.id)}`)
    setDone(false)
    setCheckout(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/marketplace" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-accent"><ChevronLeft size={16} aria-hidden="true" /> Back to marketplace</Link>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-8">
          {/* Player */}
          <div className="relative overflow-hidden rounded-xl">
            <Thumb cls={cls} className="rounded-xl" showPlay={false} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 text-white">
              {owned ? (
                <>
                  <button type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'} className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-accent shadow-lg transition-transform hover:scale-105">
                    {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                  </button>
                  <p className="text-sm font-medium">{progress >= 100 ? 'Completed — watch again any time' : progress ? `Resume · ${progress}% watched` : 'Start class'}</p>
                </>
              ) : (
                <>
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur"><Lock size={24} aria-hidden="true" /></span>
                  <p className="text-sm font-medium">Buy this class to watch the full video</p>
                </>
              )}
            </div>
            {owned && (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Watched">
                <div className="h-full bg-white transition-all" style={{ width: progress + '%' }} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge tone="accent"><TypeIcon size={12} aria-hidden="true" />{cls.type === 'live' ? 'Live session' : cls.type === 'course' ? 'Program' : 'Single class'}</Badge>
              <Badge>{cls.style}</Badge>
              <Badge>{cls.level}</Badge>
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{cls.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-600">
              <Rating value={cls.rating} />
              <span className="inline-flex items-center gap-1"><Clock size={14} aria-hidden="true" />{formatMinutes(cls.minutes)}</span>
              <span className="inline-flex items-center gap-1"><BarChart3 size={14} aria-hidden="true" />{cls.sales.toLocaleString()} dancers enrolled</span>
              {cls.date && <span className="inline-flex items-center gap-1"><CalendarDays size={14} aria-hidden="true" />{cls.date}</span>}
            </div>
            <p className="max-w-3xl text-zinc-700">
              {cls.description ||
                `${/^[aeiou]/i.test(cls.level) ? 'An' : 'A'} ${cls.level.toLowerCase()} ${cls.style.toLowerCase()} ${cls.type === 'course' ? 'program' : 'class'} with ${inst.name}. Clear demonstrations from multiple angles, counts and music cues, and the corrections ${inst.name.split(' ')[0]} gave dancers in company class for years.`}
            </p>
          </div>

          <section aria-labelledby="outline">
            <h2 id="outline" className="mb-4 text-lg font-semibold">{cls.type === 'course' ? `What’s inside · ${cls.lessons} lessons` : 'Class outline'}</h2>
            <Card className="divide-y divide-zinc-200">
              {outline.map((l, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">{i + 1}</span>
                  <span className="flex-1 text-sm">{l}</span>
                  {owned ? <Check size={16} className="text-accent" aria-label="Unlocked" /> : i === 0 ? <Badge tone="outline">Free preview</Badge> : <Lock size={14} className="text-zinc-400" aria-label="Locked" />}
                </div>
              ))}
            </Card>
          </section>

          <section aria-labelledby="teacher">
            <h2 id="teacher" className="mb-4 text-lg font-semibold">Your instructor</h2>
            <Card className="flex flex-col gap-4 p-6 sm:flex-row">
              <Avatar initials={inst.initials} size="lg" tone="accent" />
              <div className="flex flex-col gap-2">
                <div>
                  <Link to={`/instructors/${inst.id}`} className="font-semibold hover:text-accent">{inst.name}</Link>
                  <p className="text-sm text-zinc-600">{inst.headline}</p>
                </div>
                <p className="text-sm text-zinc-700">{inst.bio}</p>
                <Link to={`/instructors/${inst.id}`} className="text-sm font-medium text-accent hover:underline">View all classes by {inst.name.split(' ')[0]}</Link>
              </div>
            </Card>
          </section>
        </div>

        {/* Purchase box */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="flex flex-col gap-4 p-6">
            <p className="text-3xl font-semibold">{formatMoney(cls.price)}</p>
            <p className="-mt-2 text-sm text-zinc-600">{cls.type === 'live' ? 'One live session' : 'One-time purchase · yours to keep'}</p>
            {owned ? (
              <Button size="lg" onClick={() => setPlaying(true)}><Play size={18} aria-hidden="true" /> {progress ? 'Continue watching' : 'Start watching'}</Button>
            ) : (
              <Button size="lg" onClick={startCheckout}>{cls.type === 'live' ? 'Book your spot' : 'Buy class'}</Button>
            )}
            {!owned && (
              <p className="text-center text-sm text-zinc-600">
                Or <Link to={`/instructors/${inst.id}`} className="font-medium text-accent hover:underline">subscribe to {inst.name.split(' ')[0]}</Link> for {formatMoney(inst.subscription, { cents: false })}/month — every class included
              </p>
            )}
            <ul className="flex flex-col gap-2 border-t border-zinc-200 pt-4 text-sm text-zinc-700">
              <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /> Watch on phone, tablet or TV</li>
              <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /> No fees added at checkout</li>
              <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /> 14-day refund if you haven’t finished it</li>
            </ul>
            <details className="rounded-lg bg-zinc-50 p-4 text-sm">
              <summary className="flex cursor-pointer items-center gap-2 font-medium"><Info size={14} aria-hidden="true" /> Where your {formatMoney(cls.price, { cents: false })} goes</summary>
              <dl className="mt-3 flex flex-col gap-2">
                <Row label={`${inst.name.split(' ')[0]} receives`} value={formatMoney(split.payout)} strong />
                <Row label={`Encore platform fee (${split.plan.platformPercent}%)`} value={formatMoney(split.platform)} />
                <Row label="Card processing" value={formatMoney(split.processing)} />
              </dl>
              <Link to="/pricing" className="mt-3 inline-block font-medium text-accent hover:underline">How fees work</Link>
            </details>
          </Card>
        </aside>
      </div>

      <Modal open={checkout} onClose={() => setCheckout(false)} title="Checkout">
        {done ? (
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent"><Check size={24} aria-hidden="true" /></span>
            <div>
              <h2 className="text-lg font-semibold">You’re in!</h2>
              <p className="text-sm text-zinc-600">{cls.title} is now in your library.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" to="/account">Go to my library</Button>
              <Button onClick={() => { setCheckout(false); setPlaying(true) }}>Start watching</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 p-6">
            <div>
              <h2 className="text-lg font-semibold">Confirm your purchase</h2>
              <p className="text-sm text-zinc-600">Preview build — no card is charged.</p>
            </div>
            <div className="flex gap-4">
              <Thumb cls={cls} className="w-28 shrink-0" showPlay={false} />
              <div className="min-w-0">
                <p className="line-clamp-2 font-medium">{cls.title}</p>
                <p className="text-sm text-zinc-600">{inst.name}</p>
              </div>
            </div>
            <dl className="flex flex-col gap-2 border-y border-zinc-200 py-4 text-sm">
              <Row label="Class price" value={formatMoney(cls.price)} />
              <Row label="Service fee" value="$0.00" />
              <Row label="Total today" value={formatMoney(cls.price)} strong />
            </dl>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setCheckout(false)}>Cancel</Button>
              <Button className="flex-1" onClick={() => { buy(cls); setDone(true) }}>Pay {formatMoney(cls.price)}</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function Row({ label, value, strong }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={strong ? 'font-medium text-ink' : 'text-zinc-600'}>{label}</dt>
      <dd className={`font-mono ${strong ? 'font-semibold text-ink' : 'text-zinc-700'}`}>{value}</dd>
    </div>
  )
}
