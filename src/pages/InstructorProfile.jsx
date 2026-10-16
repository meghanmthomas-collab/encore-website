import { useNavigate, useParams } from 'react-router-dom'
import { MapPin, Users, Check } from 'lucide-react'
import { Avatar, Button, Card, Rating } from '../components/ui'
import { getInstructor, formatMoney } from '../lib/data'
import { useStore } from '../lib/store'
import { ClassCard } from './Landing'
import NotFound from './NotFound'

export default function InstructorProfile() {
  const { id } = useParams()
  const inst = getInstructor(id)
  const { allClasses, state, toggleSubscription } = useStore()
  const navigate = useNavigate()
  if (!inst) return <NotFound />
  const mine = allClasses.filter((c) => c.instructor === inst.id)
  const subscribed = state.subscriptions.includes(inst.id)
  const name = id === 'margot' ? state.proProfile.name : inst.name
  const bio = id === 'margot' ? state.proProfile.bio : inst.bio

  const subscribe = () => {
    if (state.user?.role !== 'dancer') return navigate(`/sign-in?as=dancer&next=${encodeURIComponent('/instructors/' + inst.id)}`)
    toggleSubscription(inst.id)
  }

  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8">
          <Avatar initials={inst.initials} size="xl" tone="accent" />
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-sm font-medium text-accent">{inst.styles.join(' · ')}</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight">{name}</h1>
            <p className="text-lg text-zinc-700">{inst.headline}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
              <Rating value={inst.rating} count={inst.reviews} />
              <span className="inline-flex items-center gap-1"><Users size={14} aria-hidden="true" />{inst.students} students</span>
              <span className="inline-flex items-center gap-1"><MapPin size={14} aria-hidden="true" />{inst.location}</span>
            </div>
          </div>
          <Card className="flex w-full flex-col gap-3 p-6 md:w-80">
            <p className="font-semibold">All-access subscription</p>
            <p className="text-3xl font-semibold">{formatMoney(inst.subscription, { cents: false })}<span className="text-base font-normal text-zinc-600">/month</span></p>
            <p className="text-sm text-zinc-600">Every class and program by {inst.name.split(' ')[0]}, plus new uploads. Cancel any time.</p>
            <Button onClick={subscribe} variant={subscribed ? 'outline' : 'primary'}>
              {subscribed ? <><Check size={16} aria-hidden="true" /> Subscribed — cancel</> : 'Subscribe'}
            </Button>
          </Card>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
        <section aria-labelledby="about">
          <h2 id="about" className="mb-3 text-lg font-semibold">About</h2>
          <p className="text-zinc-700">{bio}</p>
        </section>
        <section aria-labelledby="classes">
          <h2 id="classes" className="mb-4 text-lg font-semibold">Classes & programs ({mine.length})</h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {mine.map((c) => <ClassCard key={c.id} cls={c} />)}
          </div>
        </section>
      </div>
    </>
  )
}
