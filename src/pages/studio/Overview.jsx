import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Wallet, CalendarDays, Users, Star, RefreshCw, Inbox } from 'lucide-react'
import { Avatar, Badge, Button, Card, EmptyState, PageHeader, cx } from '../../components/ui'
import { studioActivity, weeklyEarnings, formatMoney } from '../../lib/data'
import { useStore } from '../../lib/store'

export function useFakeLoading(ms = 700, deps = []) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), ms)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return loading
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'sales', label: 'Sales', match: (a) => a.amount > 0 && a.status === 'Paid' },
  { id: 'subs', label: 'Subscriptions', match: (a) => a.status === 'Active' },
  { id: 'reviews', label: 'Reviews', match: (a) => a.status === 'Published' },
  { id: 'questions', label: 'Questions', match: (a) => a.activity.includes('question') },
]

export default function Overview() {
  const { state } = useStore()
  const [metric, setMetric] = useState('earnings')
  const [filter, setFilter] = useState('all')
  const [refreshKey, setRefreshKey] = useState(0)
  const loading = useFakeLoading(800, [refreshKey])
  const first = state.proProfile.name.split(' ')[0]

  const f = FILTERS.find((x) => x.id === filter)
  const rows = f.match ? studioActivity.filter(f.match) : studioActivity

  const data = weeklyEarnings.map((w) => ({ label: w.week, value: metric === 'earnings' ? w.amount : Math.round(w.amount / 105) }))
  const max = metric === 'earnings' ? 2000 : 20
  const ticks = metric === 'earnings' ? ['$2k', '$1.5k', '$1k', '$500', '$0'] : ['20', '15', '10', '5', '0']

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`Welcome back, ${first}`}
        description="Here’s how your teaching went over the last 30 days."
        actions={<Badge tone="outline" className="h-10 px-3 text-sm"><CalendarDays size={16} aria-hidden="true" /> Sep 17 – Oct 16, 2026</Badge>}
      />

      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi title="Earnings" icon={Wallet} value="$6,780" delta="↑ 17.9%" note="vs. previous 30 days" />
        <Kpi title="Sessions & sales" icon={CalendarDays} value="65" delta="↑ 11" note="42 videos · 23 live" />
        <Kpi title="Active students" icon={Users} value="37" delta="+4 new" note="86% came back" />
        <Kpi title="Average rating" icon={Star} value="4.9" suffix=" / 5" delta="112 reviews" neutral note="9 this month" />
      </section>

      <Card className="flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold">{metric === 'earnings' ? 'Weekly earnings' : 'Weekly sales'}</h2>
            <p className="text-sm text-zinc-600">{metric === 'earnings' ? 'Last 12 weeks · $16,980 total, paid out every Friday' : 'Last 12 weeks · videos, programs and live sessions'}</p>
          </div>
          <div role="group" aria-label="Chart metric" className="flex gap-1 rounded-lg bg-zinc-100 p-1">
            {['earnings', 'sales'].map((m) => (
              <button key={m} type="button" aria-pressed={metric === m} onClick={() => setMetric(m)} className={cx('h-8 rounded-md px-3 text-sm font-medium capitalize', metric === m ? 'bg-white text-ink shadow-sm' : 'text-zinc-600')}>{m}</button>
            ))}
          </div>
        </div>
        <div role="img" aria-label={`Bar chart of weekly ${metric}, rising over the last 12 weeks`} className="flex gap-2">
          <div aria-hidden="true" className="flex h-[240px] w-10 flex-col justify-between pb-6 text-right font-mono text-xs text-zinc-500">
            {ticks.map((t) => <span key={t} className="-translate-y-2">{t}</span>)}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="relative h-[216px]">
              <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between">{ticks.map((t) => <div key={t} className="h-px bg-zinc-100" />)}</div>
              <div className="absolute inset-0 flex items-end gap-1 px-1 sm:gap-2">
                {data.map((d, i) => (
                  <div key={d.label} title={`Week of ${d.label}: ${metric === 'earnings' ? formatMoney(d.value, { cents: false }) : d.value + ' sales'}`}
                    className="min-w-0 flex-1 rounded-t transition-all duration-300"
                    style={{ height: `${(d.value / max) * 216}px`, background: i === data.length - 1 ? '#013a63' : 'rgba(1,58,99,0.35)' }} />
                ))}
              </div>
            </div>
            <div aria-hidden="true" className="flex gap-1 px-1 text-xs text-zinc-500 sm:gap-2">
              {data.map((d, i) => <span key={d.label} className={cx('min-w-0 flex-1 overflow-hidden whitespace-nowrap text-center', i % 2 && 'max-sm:invisible')}>{d.label}</span>)}
            </div>
          </div>
        </div>
      </Card>

      <ActivityTable rows={rows} loading={loading} filter={filter} setFilter={setFilter} onRefresh={() => setRefreshKey((k) => k + 1)} />
    </div>
  )
}

function Kpi({ title, icon: Icon, value, suffix, delta, note, neutral }) {
  return (
    <Card className="flex flex-col gap-2 p-6">
      <div className="flex items-center justify-between text-zinc-600">
        <h2 className="text-sm font-medium">{title}</h2>
        <Icon size={16} aria-hidden="true" />
      </div>
      <p className="text-3xl font-semibold tracking-tight tabular-nums">{value}{suffix && <span className="text-base font-medium text-zinc-500">{suffix}</span>}</p>
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
        <Badge tone={neutral ? 'neutral' : 'accent'}>{delta}</Badge>{note}
      </div>
    </Card>
  )
}

const statusTone = { Paid: 'accent', Active: 'accent', Published: 'neutral', Refunded: 'outline' }

function ActivityTable({ rows, loading, filter, setFilter, onRefresh }) {
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 pb-4">
        <div>
          <h2 className="text-base font-semibold">Recent activity</h2>
          <p className="text-sm text-zinc-600">Sales, subscriptions and reviews from your students.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Filter activity" className="flex flex-wrap gap-1 rounded-lg bg-zinc-100 p-1">
            {FILTERS.map((x) => (
              <button key={x.id} type="button" aria-pressed={filter === x.id} onClick={() => setFilter(x.id)} className={cx('h-8 rounded-md px-3 text-sm font-medium', filter === x.id ? 'bg-white text-ink shadow-sm' : 'text-zinc-600')}>{x.label}</button>
            ))}
          </div>
          <Button variant="outline" onClick={onRefresh}><RefreshCw size={16} aria-hidden="true" className={loading ? 'animate-spin' : ''} /> Refresh</Button>
        </div>
      </div>

      {!loading && rows.length === 0 ? (
        <div className="border-t border-zinc-200">
          <EmptyState icon={Inbox} title="Nothing here yet" action={<Button variant="outline" onClick={() => setFilter('all')}>Show all activity</Button>}>
            When students send you questions about a class, they’ll appear here so you can reply.
          </EmptyState>
        </div>
      ) : (
        <div className="overflow-x-auto border-t border-zinc-200">
          <table className="w-full min-w-[760px] text-sm" aria-busy={loading}>
            <thead className="bg-zinc-50 text-left text-zinc-600">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Student</th>
                <th scope="col" className="px-4 py-3 font-medium">Activity</th>
                <th scope="col" className="px-4 py-3 font-medium">Class</th>
                <th scope="col" className="px-4 py-3 font-medium">Date</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Amount</th>
                <th scope="col" className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }, (_, i) => (
                    <tr key={i} className="border-t border-zinc-100">
                      <td className="px-6 py-4"><div className="flex items-center gap-3"><Sk className="h-8 w-8 rounded-full" /><Sk className="h-3 w-28" /></div></td>
                      <td className="px-4 py-4"><Sk className="h-3 w-36" /></td>
                      <td className="px-4 py-4"><Sk className="h-3 w-44" /></td>
                      <td className="px-4 py-4"><Sk className="h-3 w-24" /></td>
                      <td className="px-4 py-4"><Sk className="ml-auto h-3 w-14" /></td>
                      <td className="px-6 py-4"><Sk className="h-6 w-20 rounded-full" /></td>
                    </tr>
                  ))
                : rows.map((a) => (
                    <tr key={a.id} className="border-t border-zinc-100 hover:bg-zinc-50">
                      <td className="px-6 py-3"><div className="flex items-center gap-3"><Avatar initials={a.initials} size="sm" /><span className="whitespace-nowrap font-medium">{a.student}</span></div></td>
                      <td className="whitespace-nowrap px-4 py-3">{a.activity}</td>
                      <td className="px-4 py-3 text-zinc-600">{a.item}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-zinc-600">{a.date}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-mono">{a.amount == null ? '—' : formatMoney(a.amount)}</td>
                      <td className="px-6 py-3"><Badge tone={statusTone[a.status]}>{a.status}</Badge></td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {loading && <p role="status" className="sr-only">Loading recent activity…</p>}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 px-6 py-4 text-sm text-zinc-600">
        <span>{loading ? 'Loading activity…' : `Showing ${rows.length} of 48 events from the last 7 days`}</span>
        <Link to="/studio/earnings" className="font-medium text-accent hover:underline">View all transactions →</Link>
      </div>
    </Card>
  )
}

export function Sk({ className }) {
  return <div className={cx('animate-pulse rounded bg-zinc-200/70', className)} />
}
