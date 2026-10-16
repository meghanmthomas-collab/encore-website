import { Link } from 'react-router-dom'
import { ArrowRight, Video, Radio, Layers, Wallet, CalendarCheck, ShieldCheck, Upload, Users } from 'lucide-react'
import { Avatar, Button, Card, Rating, Thumb } from '../components/ui'
import { getInstructor, instructors, formatMoney, formatMinutes } from '../lib/data'
import { useStore } from '../lib/store'
import { PLANS } from '../lib/fees'

export default function Landing() {
  const { allClasses } = useStore()
  const featured = allClasses.filter((c) => ['c2', 'c5', 'c6', 'c9'].includes(c.id))

  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700">Taught by former professional dancers</span>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Professional training from trained professionals
            </h1>
            <p className="max-w-xl text-lg text-zinc-600">
              On-demand classes, multi-week programs and live coaching in ballet, contemporary, hip-hop, jazz, flamenco and more — from instructors who performed for a living.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button to="/marketplace" size="lg">Browse classes <ArrowRight size={18} aria-hidden="true" /></Button>
              <Button to="/teach" size="lg" variant="outline">I’m a former pro — teach</Button>
            </div>
            <dl className="mt-4 grid max-w-md grid-cols-3 gap-6 border-t border-zinc-200 pt-6">
              <div><dt className="text-sm text-zinc-600">Dance styles</dt><dd className="text-2xl font-semibold">7</dd></div>
              <div><dt className="text-sm text-zinc-600">Classes from</dt><dd className="text-2xl font-semibold">$10</dd></div>
              <div><dt className="text-sm text-zinc-600">Instructors keep</dt><dd className="text-2xl font-semibold">up to 92%</dd></div>
            </dl>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((c, i) => (
                <Link key={c.id} to={`/class/${c.id}`} className={i % 2 ? 'translate-y-8' : ''}>
                  <Thumb cls={c} className="shadow-sm transition-transform hover:-translate-y-1" />
                  <p className="mt-2 line-clamp-1 text-sm font-medium text-ink">{c.title}</p>
                  <p className="text-xs text-zinc-600">{getInstructor(c.instructor).name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two sides */}
      <section id="how" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">How Encore works</h2>
          <p className="mt-3 text-lg text-zinc-600">One platform, two sides: dancers find the right teacher, and retired professionals build a teaching business around what they already know.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="flex flex-col gap-6 p-8">
            <div>
              <p className="text-sm font-medium text-accent">For dancers</p>
              <h3 className="mt-1 text-xl font-semibold">Learn from the people who did it</h3>
            </div>
            <ul className="flex flex-col gap-5">
              <Step icon={Video} title="Buy single classes or full programs">Pay once and keep access. Watch on any device, at your own pace.</Step>
              <Step icon={Radio} title="Book live and private coaching">Get feedback on your technique in small live sessions or 1:1.</Step>
              <Step icon={CalendarCheck} title="Track your progress">Your library remembers where you stopped and what to do next.</Step>
            </ul>
            <Button to="/marketplace" variant="subtle" className="w-fit">Find a class</Button>
          </Card>
          <div className="flex flex-col gap-6 rounded-xl bg-accent p-8 text-white">
            <div>
              <p className="text-sm font-medium text-white/80">For former professionals</p>
              <h3 className="mt-1 text-xl font-semibold">Turn your career into a second one</h3>
            </div>
            <ul className="flex flex-col gap-5">
              <Step light icon={Upload} title="Upload classes and programs">Film once, sell for years. Set your own prices.</Step>
              <Step light icon={Users} title="Build a student base">Your own instructor page, subscriptions, reviews and messaging.</Step>
              <Step light icon={Wallet} title="Get paid every week">Clear fees, shown before every sale. Payouts land each Friday.</Step>
            </ul>
            <Button to="/teach" variant="outline" className="w-fit border-white">Start teaching</Button>
          </div>
        </div>
      </section>

      {/* Featured classes */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">Popular right now</h2>
              <p className="mt-2 text-zinc-600">Programs dancers are enrolling in this month.</p>
            </div>
            <Link to="/marketplace" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">See all classes <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c) => <ClassCard key={c.id} cls={c} />)}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Meet the instructors</h2>
          <Link to="/instructors" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">All instructors <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((i) => (
            <Link key={i.id} to={`/instructors/${i.id}`} className="flex min-w-0 items-center gap-4 rounded-xl border border-zinc-200 p-4 transition-colors hover:border-accent">
              <Avatar initials={i.initials} size="lg" tone="accent" />
              <div className="min-w-0">
                <p className="font-semibold">{i.name}</p>
                <p className="truncate text-sm text-zinc-600">{i.headline}</p>
                <p className="mt-1 text-sm text-zinc-600">{i.styles.join(' · ')}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Fees teaser */}
      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Fees you can see before you sell</h2>
            <p className="text-lg text-zinc-600">Dancers pay the price on the class — nothing added at checkout. Instructors pick a plan and see exactly what they keep from every sale.</p>
            <div className="flex items-center gap-2 text-sm text-zinc-600"><ShieldCheck size={16} className="text-accent" aria-hidden="true" /> Secure card payments · refunds handled for you</div>
            <Button to="/pricing" className="w-fit">See the full fee breakdown</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {PLANS.map((p) => (
              <Card key={p.id} className="p-6">
                <p className="font-semibold">{p.name}</p>
                <p className="mt-2 text-3xl font-semibold">{p.platformPercent}%</p>
                <p className="text-sm text-zinc-600">platform fee</p>
                <p className="mt-4 text-sm text-zinc-700">{p.monthly ? `${formatMoney(p.monthly, { cents: false })}/month` : 'No monthly cost'}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 text-white sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Your next class is one click away.</h2>
            <p className="mt-2 text-white/80">Create a free account — you only pay for the classes you choose.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/sign-in?mode=join" variant="outline" size="lg">Create free account</Button>
          </div>
        </div>
      </section>
    </>
  )
}

function Step({ icon: Icon, title, children, light }) {
  return (
    <li className="flex gap-4">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${light ? 'bg-white/10 text-white' : 'bg-accent-soft text-accent'}`}><Icon size={18} aria-hidden="true" /></span>
      <div>
        <p className="font-medium">{title}</p>
        <p className={`text-sm ${light ? 'text-white/80' : 'text-zinc-600'}`}>{children}</p>
      </div>
    </li>
  )
}

export function ClassCard({ cls }) {
  const inst = getInstructor(cls.instructor)
  return (
    <Link to={`/class/${cls.id}`} className="group flex flex-col gap-3 rounded-xl">
      <Thumb cls={cls} className="transition-transform group-hover:-translate-y-1" />
      <div className="flex flex-col gap-1">
        <p className="line-clamp-2 font-medium text-ink group-hover:text-accent">{cls.title}</p>
        <p className="text-sm text-zinc-600">{inst?.name} · {formatMinutes(cls.minutes)}</p>
        <div className="flex items-center justify-between">
          <Rating value={cls.rating} count={cls.sales} />
          <span className="font-semibold">{formatMoney(cls.price, { cents: false })}</span>
        </div>
      </div>
    </Link>
  )
}
