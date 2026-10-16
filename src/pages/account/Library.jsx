import { Link } from 'react-router-dom'
import { Library as LibraryIcon, PlayCircle } from 'lucide-react'
import { Button, Card, EmptyState, PageHeader, Thumb } from '../../components/ui'
import { getInstructor, formatMinutes } from '../../lib/data'
import { useStore } from '../../lib/store'
import { Sk, useFakeLoading } from '../studio/Overview'

export default function Library() {
  const { state, allClasses, studioClasses } = useStore()
  const loading = useFakeLoading(600)
  const all = [...allClasses, ...studioClasses]
  const owned = all.filter((c, i) => all.findIndex((x) => x.id === c.id) === i && (state.purchases.includes(c.id) || state.subscriptions.includes(c.instructor)))
  const inProgress = owned.filter((c) => (state.progress[c.id] || 0) > 0 && state.progress[c.id] < 100)
  const first = state.dancerProfile.name.split(' ')[0]

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={`Hi ${first}, ready to dance?`} description={`Goal: ${state.dancerProfile.goal}`} actions={<Button to="/marketplace" variant="outline">Browse more classes</Button>} />

      {inProgress.length > 0 && !loading && (
        <section aria-labelledby="continue">
          <h2 id="continue" className="mb-4 text-base font-semibold">Continue watching</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {inProgress.map((c) => (
              <Link key={c.id} to={`/class/${c.id}`} className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 hover:border-accent">
                <Thumb cls={c} className="w-32 shrink-0" showPlay={false} />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 font-medium">{c.title}</p>
                  <p className="text-sm text-zinc-600">{getInstructor(c.instructor).name}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-zinc-100"><div className="h-full rounded-full bg-accent" style={{ width: state.progress[c.id] + '%' }} /></div>
                  <p className="mt-1 text-xs text-zinc-600">{state.progress[c.id]}% watched</p>
                </div>
                <PlayCircle size={28} className="shrink-0 text-accent" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="lib">
        <h2 id="lib" className="mb-4 text-base font-semibold">My library {loading ? '' : `(${owned.length})`}</h2>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
            {Array.from({ length: 3 }, (_, i) => <div key={i} className="flex flex-col gap-3"><Sk className="aspect-video w-full rounded-lg" /><Sk className="h-3 w-3/4" /><Sk className="h-3 w-1/2" /></div>)}
          </div>
        ) : owned.length === 0 ? (
          <Card><EmptyState icon={LibraryIcon} title="Your library is empty" action={<Button to="/marketplace">Find your first class</Button>}>Classes you buy and instructors you subscribe to will show up here.</EmptyState></Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {owned.map((c) => {
              const p = state.progress[c.id] || 0
              return (
                <Link key={c.id} to={`/class/${c.id}`} className="group flex flex-col gap-2">
                  <Thumb cls={c} className="transition-transform group-hover:-translate-y-1" />
                  <p className="line-clamp-1 font-medium group-hover:text-accent">{c.title}</p>
                  <p className="text-sm text-zinc-600">{getInstructor(c.instructor).name} · {formatMinutes(c.minutes)}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-zinc-100"><div className="h-full rounded-full bg-accent" style={{ width: p + '%' }} /></div>
                    <span className="text-xs text-zinc-600">{p >= 100 ? 'Done' : p ? p + '%' : 'Not started'}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
